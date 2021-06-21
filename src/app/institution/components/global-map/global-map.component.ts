import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AgmCoreModule} from '@agm/core';
import { PaisesService} from '@core/services/paises/paises.service'
import { ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {

 
  lat: number = -33.045560;
  lng: number = -71.619420;
  zoom: number;
  mapTypeId:string;
  located:boolean;
  icon = "./../../../../assets/icons/place.svg";

  paises: any[];

  constructor(
    private paisesService:PaisesService,
    private activatedRoute: ActivatedRoute,
    ){
	  this.zoom = 16;
	  this.mapTypeId = 'hybrid';
	  this.located = false;
	  this.paises = [];
  }
  
  ngOnInit(){
  // this.activatedRoute.params.subscribe((params: Params) => {
  //   console.log(params);
    
  // });   
	this.paises = this.paisesService.getAll();
  console.log(this.paises);
	this.getCurrentPosition();
  
  }

  mapClicked(event:any){
	  console.log(event);
  }

  setMap(){

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
  


}
