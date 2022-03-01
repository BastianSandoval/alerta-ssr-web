import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institutions-screen',
  templateUrl: './institutions-screen.component.html',
  styleUrls: ['./institutions-screen.component.css']
})
export class InstitutionsScreenComponent implements OnInit {

  constructor(
    private router: Router
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
