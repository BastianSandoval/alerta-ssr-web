import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalMapComponent } from '@shared/components/global-map/global-map.component';

@Component({
  selector: 'app-tenders-screen',
  templateUrl: './tenders-screen.component.html',
  styleUrls: ['./tenders-screen.component.css']
})
export class TendersScreenComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
  ) { }

  public shows: any


  public getUrl(): string {
    return this.router.url;

  }

  show(boton: string) {
    if (boton === 'mapa') {
      this.shows = true;
      return this.shows;
    } else {
      this.shows = false;
      return this.shows;
    }
  }


}
