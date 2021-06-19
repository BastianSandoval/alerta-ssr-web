import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule} from '@agm/core';

@Component({
  selector: 'app-cases-screen',
  templateUrl: './cases-screen.component.html',
  styleUrls: ['./cases-screen.component.css']
})
export class CasesScreenComponent implements OnInit {

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
