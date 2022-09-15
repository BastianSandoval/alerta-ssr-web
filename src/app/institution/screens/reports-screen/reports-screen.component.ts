import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalMapComponent } from '@shared/components/global-map/global-map.component';

@Component({
  selector: 'app-reports-screen',
  templateUrl: './reports-screen.component.html',
  styleUrls: ['./reports-screen.component.css']
})
export class ReportsScreenComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  public shows:any
  

  ngOnInit(): void {
  }

  public getUrl(): string{
    return this.router.url;

  }
  
  show(boton:string){
    if (boton === 'mapa'){
      this.shows = true;
      return this.shows;
    } else {
      this.shows=false;
      return this.shows;
    }
  }
  

}
