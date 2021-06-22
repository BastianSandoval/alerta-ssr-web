import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form/form.service';

import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { CommentProviderService } from '../../../core/providers/comment/comment-provider.service';

@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {

  checkoutForm: FormGroup;
  lat: number = -33;
  lng: number = -71;
  zoom: number;
  mapTypeId:string;
  located:boolean;
  icon = "./../../../../assets/icons/place.svg";

  reportList: any[];
  reporte: any;

  comments: any[];

  clickMark: boolean;
  fitBound: boolean;

  constructor(
    private reportProviderService:ReportProviderService,
    private commentProviderService: CommentProviderService,
    private formService: FormService,
    ){

    this.createFormGroup();
	  this.zoom = 5;
	  this.mapTypeId = 'roadmap';
	  this.located = false;
	  this.reportList = [];
    this.clickMark = false;
    this.fitBound = true;
  }
  
  async ngOnInit(){
	let data:any = await this.reportProviderService.getAllReports().toPromise();
  this.reportList = data.docs;
  this.lat = -33.449125;
  this.lng = -70.701529;
  console.log(this.lat);
  this.getCurrentPosition();
  
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
    let filterReport = this.reportList.filter(report => 
      report.location.latitude == event.latitude && report.location.longitude == event.longitude
    );

    console.log(filterReport);
    this.clickMark = true;
    this.fitBound = false;
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
