import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule} from '@agm/core';

@Component({
  selector: 'app-reports-screen',
  templateUrl: './reports-screen.component.html',
  styleUrls: ['./reports-screen.component.css']
})
export class ReportsScreenComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  public showw:any
  

  ngOnInit(): void {
  }

  public getUrl(): string{
    return this.router.url;

  }
  
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
