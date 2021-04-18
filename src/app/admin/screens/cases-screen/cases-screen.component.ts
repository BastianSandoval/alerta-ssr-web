import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cases-screen',
  templateUrl: './cases-screen.component.html',
  styleUrls: ['./cases-screen.component.css']
})
export class CasesScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public shows:any
  
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
