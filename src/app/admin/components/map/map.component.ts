import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form/form.service';
import { Router } from '@angular/router';

import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { EventProviderService } from '../../../core/providers/event/event-provider.service';
import { CommentProviderService } from '../../../core/providers/comment/comment-provider.service';
import { CategoryProviderService } from '../../../core/providers/category/category-provider.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  
  checkoutForm: FormGroup;
  lat: number = -33;
  lng: number = -71;
  //current position
  currentLat: number;
  currentLng: number;
  zoom: number;
  mapTypeId:string;
  located:boolean;
  icon = "./../../../../assets/icons/place.svg";

  reportList: any[];
  reporte: any;
  url :any;

  fitBounds:boolean = true;

  //buscador
  filterCategory!: string;
  value!: string;
  filterReport!: string;
  isCategory: boolean = false;
  categoryList: any;
  titulo: string;

  eventos: any[];

  comments: any[];

  clickMark: boolean;

  constructor(
    private reportProviderService:ReportProviderService,
    private commentProviderService: CommentProviderService,
    private router:Router,
    private formService: FormService,
    private eventProviderService: EventProviderService,
    private categoryProviderService: CategoryProviderService
    ){

    this.createFormGroup();
	  this.zoom = 5;
	  this.mapTypeId = 'roadmap';
	  this.located = false;
	  this.reportList = [];
    this.clickMark = false;
  }
  
  async ngOnInit(){

  //busco categorias
  this.categoryList = await this.categoryProviderService.getAllCategories().toPromise();
  let data: any;
  this.url = this.router.url.slice(7,this.router.url.length)
  console.log(this.url);
  if(this.url === 'reports'){

    this.setReports();
    this.titulo = "reporte";
   
  }else{
    this.setEvents();
    this.titulo = "caso";
  }

  this.lat = -33.449125;
  this.lng = -70.701529;
  console.log(this.lat);
  this.getCurrentPosition();
	
  
  }

  async setReports(dataCategory?: any){
    let data: any;
    if(this.isCategory){
      data = dataCategory
    }else{
      data = await this.reportProviderService.getAllReports().toPromise();
      console.log(data);
    }
    this.reportList = data.docs;
  }

  async setEvents(dataCategory?: any){
    let data: any;
    if(this.isCategory){
      data = dataCategory
    }else{
      data = await this.eventProviderService.getEvents().toPromise();
      console.log(data);
    }

    if(data.docs.length != 0){
      this.eventos = data.docs;

      for(const event of this.eventos){
        event.idReporte = event.complaints[event.complaints.length - 1]._id;
        console.log(event.idReporte);
        let report = await this.reportProviderService.getReport(event.idReporte).toPromise();
        this.reportList.push(report);
        console.log(report);
        // event.report = await this.reportProviderService.getReport(event.idReporte).toPromise();
        // event.category = event.report.category.name;
        // event.idCategory = event.report.category._id;
      }
    }
  }



  private createFormGroup(){
    this.checkoutForm = this.formService.buildFormGroup({
      comentario: new FormControl('',[Validators.required])
    });
  }

  mapClicked(event:any){
	  console.log(event);
    this.clickMark = false;
  }

  markerClicked(event:any){
    console.log(this.reportList);
    let filterReport = this.reportList.filter(report => 
      report.location.latitude == event.latitude && report.location.longitude == event.longitude
    );

    console.log(filterReport);
    this.clickMark = true;
    let latLng : any = {
      lat: parseFloat(filterReport[0].location.latitude),
      lng: parseFloat(filterReport[0].location.longitude),
    }

    this.reporte = filterReport[0];
    console.log(this.reporte);
    this.centerChange(latLng);
    this.changeMapZoom(16);

    this.comments = filterReport[0].comments;
  }

  changeMapZoom(event:any){
    this.zoom = event;
  }

  cambioDeCentro(event:any){
    this.currentLat = event.lat;
    this.currentLng = event.lng;
  }

  centerChange(event: any){
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
  getCurrentPosition(){
	  navigator.geolocation.getCurrentPosition(position=>{
		  this.lat = position.coords.latitude;
		  this.lng = position.coords.longitude;
		  this.located=true;
	  })
  }

  //method filters

  async categoryFilter(event:any) {
    //cambio el zoom y center
    this.centerChange({lat:parseFloat("-33.449125"), lng: parseFloat("-70.701529")});
    this.changeMapZoom(5);
    this.fitBounds = true;

    if(event.target.value != ''){
      this.isCategory = true;
      this.filterCategory = event.target.value;
      if(this.url === 'reports'){
        const data: any = await this.reportProviderService.getComplaintsPerCategory(this.filterCategory).toPromise();
        console.log(data);
        if(data.docs.length === 0){
          this.isCategory = false;
        }
        this.setReports(data);
        
      }else{
        const data: any = await this.eventProviderService.getEventsPerCategory(this.filterCategory).toPromise();
        console.log(data);
        this.setEvents(data);
      }
     
     
    }else{
      this.isCategory = false;
      
      if(this.url === 'reports'){
        this.setReports();
      }else{
        this.setEvents();
      }
    }
  }

  clearFilter() {
    this.filterCategory = '';
    this.filterReport= '';
  }

  onValue(value: string) {
    this.value = value;
    if(this.value === ''){
      this.clearFilter();
    } else {
      this.filterReport = this.value;
    }
    
  }

  onEnter(value: string) {
    this.filterReport = value;
  }

  searchButton() {
    if(this.value){
      this.filterReport = this.value;
    }else{
      this.clearFilter();
    }
  }

  
}
