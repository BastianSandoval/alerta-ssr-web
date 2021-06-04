import { Component, Input, OnInit } from '@angular/core';

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  url?: string;
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
    this.marker = {
      lat: parseFloat(this.lat),
      lng: parseFloat(this.lng),
      draggable: false
    }
  }
  
  @Input()
  lat: string;
  @Input()
  lng: string;

  marker: Marker;

  constructor(){
    
  }

  // google maps zoom level
  zoom: number = 17;
  // initial center position for the map

  url = '../../../assets/complaint-marker.svg';
}
