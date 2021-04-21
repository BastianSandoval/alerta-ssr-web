import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AgmCoreModule} from '@agm/core';
import { PaisesService} from '@core/services/paises/paises.service'



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = -33.045560;
  lng: number = -71.619420;
  zoom: number;
  mapTypeId:string;
  located:boolean;
  icon = "./../../../../assets/icons/place.svg";

  paises: any[];

  constructor(private paisesService:PaisesService){
	  this.zoom=16;
	  this.mapTypeId='hybrid';
	  this.located=false;
	  this.paises = [];
  }
  
  ngOnInit(){
	this.paises= this.paisesService.getAll();
	this.getCurrentPosition(); 
  }

  mapClicked(event:any){
	  console.log(event);
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
		  this.lat=position.coords.latitude;
		  this.lng=position.coords.longitude;
		  this.located=true;
	  })
  }
  
}
