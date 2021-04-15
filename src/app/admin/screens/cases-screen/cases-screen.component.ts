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
  public showw:any
  
  show(boton:string){
    if (boton === 'mapa'){
      this.showw = true;
      return this.showw;
    } else {
      this.showw=false;
      return this.showw;
    }
  }

}
