import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form/form.service';
import { Router } from '@angular/router';

import { Comment } from '../../../core/models/comment.model';
import { Institution } from '@core/models/institution.model';

import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { EventProviderService } from '../../../core/providers/event/event-provider.service';
import { CommentProviderService } from '../../../core/providers/comment/comment-provider.service';
import { CategoryProviderService } from '../../../core/providers/category/category-provider.service';
import { TokenService } from '../../../core/services/token/token.service';
import { InstitutionProviderService } from '../../../core/providers/institution/institution-provider.service';
import { Report } from '@core/models/report.model';
import { Commune } from '@core/models/commune.model';
import { Location } from '../../../core/models/location.model';

@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {

  checkoutForm: FormGroup;
  communes: Commune[];
  lat: number = -33;
  lng: number = -71;
  //current position
  currentLat: number;
  currentLng: number;
  zoom: number;
  mapTypeId: string;
  located: boolean;
  icon = "./../../../../assets/icons/place.svg";

  reportList: any[];
  reporte: any;
  url: any;

  fitBounds: boolean = false;

  //buscador
  filterCategory!: string;
  value!: string;
  filterReport!: string;
  isCategory: boolean = false;
  categoryList: any;
  titulo: string;
  userId: string;
  idComment: string;

  eventos: any[];

  comments: any[];

  clickMark: boolean;
  fitBound: boolean;

  constructor(
    private reportProviderService: ReportProviderService,
    private commentProviderService: CommentProviderService,
    private router: Router,
    private formService: FormService,
    private eventProviderService: EventProviderService,
    private categoryProviderService: CategoryProviderService,
    private tokenService: TokenService,
    private institutionProviderService: InstitutionProviderService,
  ) {

    this.createFormGroup();
    this.zoom = 5;
    this.mapTypeId = 'roadmap';
    this.located = false;
    this.reportList = [];
    this.clickMark = false;
    this.fitBound = true;


  }

  async ngOnInit() {
    this.userId = JSON.parse(this.tokenService.getToken()).userId;
    (await this.institutionProviderService.getInstitution(this.userId).toPromise()).assignedCommunes;

    //busco categorias
    this.categoryList = await this.categoryProviderService.getAllCategories().toPromise();
    let data: any;
    this.url = this.router.url.slice(13, this.router.url.length)
    console.log(this.url);
    if (this.url === 'reports') {

      this.setReports();
      this.titulo = "reporte";

    } else {
      this.setEvents();
      this.titulo = "caso";
    }

    this.lat = -33.449125;
    this.lng = -70.701529;
    console.log(this.lat);
    this.getCurrentPosition();


  }

  async setReports(dataCategory?: any) {

    let data: any;
    if (this.isCategory) {
      data = dataCategory
    } else {
      this.userId = JSON.parse(this.tokenService.getToken()).userId;
      this.communes = (await this.institutionProviderService.getInstitution(this.userId).toPromise()).assignedCommunes;
      data = await this.reportProviderService.getAllReports(1, 100).toPromise();
    }
    this.reportList = data.docs.filter(
      report => {
        let flag: boolean = false;
        for (let commune of this.communes) {
          if (commune._id == report.location.commune) {
            flag = true;
            break;
          }
        }
        return flag;
      }
    );
  }

  async setEvents(dataCategory?: any) {
    let data: any;
    if (this.isCategory) {
      data = dataCategory
    } else {
      data = await this.eventProviderService.getEvents().toPromise();
      console.log(data);
    }

    if (data.docs.length != 0) {
      this.eventos = data.docs;

      for (const event of this.eventos) {
        event.idReporte = event.complaints[event.complaints.length - 1]._id;
        let report = await this.reportProviderService.getReport(event.idReporte).toPromise();
        this.reportList.push(report);
      }
    }
  }

  async saveComment(event: any) {
    event.preventDefault;
    if (this.checkoutForm.valid) {
      try {
        const commentDescription: string = this.checkoutForm.value.comentario;
        console.log(commentDescription);
        this.userId = JSON.parse(this.tokenService.getToken()).userId; //se obtiene la id del usuario
        const comment: Comment = {  //se construye el objeto comentario
          description: commentDescription,
          complaint: this.reporte._id,
          entity: this.userId
        }
        //se agrega a la BDD de comments y se recibe la id asignada
        await this.commentProviderService.addComment(comment)
          .subscribe((data) => {
            this.idComment = data._id
          });

        //se vincula la id del comentario al reporte comentado
        this.reporte.comments.push(this.idComment);
        this.reportProviderService.updateReport(this.reporte._id, this.reporte, false);

        //se vincula la id del comentario a la institucion que realizo el comentario
        let institution: Institution = await this.institutionProviderService.getInstitution(this.userId).toPromise();
        institution.comments.push(this.idComment);
        this.institutionProviderService.updateInstitution(institution._id, institution);
      }
      catch (error) {
        console.log(error)
      }
    }

  }


  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      comentario: new FormControl('', [Validators.required])
    });
  }

  mapClicked(event: any) {
    console.log(event);
    this.clickMark = false;
  }

  markerClicked(event: any) {
    console.log(this.reportList);
    let filterReport = this.reportList.filter(report =>
      report.location.latitude != event.latitude && report.location.longitude != event.longitude
    );

    console.log(filterReport);
    this.clickMark = true;
    let latLng: any = {
      lat: parseFloat(filterReport[0].location.latitude),
      lng: parseFloat(filterReport[0].location.longitude),
    }

    this.reporte = filterReport[0];
    console.log(this.reporte);
    this.centerChange(latLng);
    this.changeMapZoom(16);

    this.comments = filterReport[0].comments;
  }

  changeMapZoom(event: any) {
    this.zoom = event;
  }

  cambioDeCentro(event: any) {
    this.currentLat = event.lat;
    this.currentLng = event.lng;
  }

  centerChange(event: any) {
    this.lat = event.lat;
    this.lng = event.lng;
  }

  /* mapClicked($event: any) {
   this.markers.push({
     lat: $event.coords.lat,
     lng: $event.coords.lng,
     draggable: true
   });
 } */
  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.located = true;
    })
  }

  //method filters

  async categoryFilter(event: any) {
    //cambio el zoom y center
    this.centerChange({ lat: parseFloat("-33.449125"), lng: parseFloat("-70.701529") });
    this.changeMapZoom(5);
    this.fitBounds = true;

    if (event.target.value != '') {
      this.isCategory = true;
      this.filterCategory = event.target.value;
      if (this.url === 'reports') {
        const data: any = await this.reportProviderService.getComplaintsPerCategory(this.filterCategory).toPromise();
        console.log(data);
        if (data.docs.length === 0) {
          this.isCategory = false;
        }
        this.setReports(data);

      } else {
        const data: any = await this.eventProviderService.getEventsPerCategory(this.filterCategory).toPromise();
        console.log(data);
        this.setEvents(data);
      }


    } else {
      this.isCategory = false;

      if (this.url === 'reports') {
        this.setReports();
      } else {
        this.setEvents();
      }
    }
  }

  clearFilter() {
    this.filterCategory = '';
    this.filterReport = '';
  }

  onValue(value: string) {
    this.value = value;
    if (this.value === '') {
      this.clearFilter();
    } else {
      this.filterReport = this.value;
    }

  }

  onEnter(value: string) {
    this.filterReport = value;
  }

  searchButton() {
    if (this.value) {
      this.filterReport = this.value;
    } else {
      this.clearFilter();
    }
  }



  public controlIsRequired(formControlName: string): boolean {
    return this.formService.controlIsRequired(this.checkoutForm, formControlName);
  }

  public controlIsInvalid(formControlName: string): boolean {
    return this.formService.controlIsInvalid(this.checkoutForm, formControlName);
  }

  public controlIsInvalidEmail(formControlName: string): boolean {
    return this.formService.controlIsInvalidEmail(this.checkoutForm, formControlName);
  }

  public controlIsInvalidPattern(formControlName: string): boolean {
    return this.formService.controlIsInvalidPattern(this.checkoutForm, formControlName);
  }

  public controlIsInvalidLength(formControlName: string): boolean {
    return this.formService.controlIsInvalidLength(this.checkoutForm, formControlName);
  }



}
