import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-edit-categorys-screen',
  templateUrl: './edit-categorys-screen.component.html',
  styleUrls: ['./edit-categorys-screen.component.css']
})
export class EditCategorysScreenComponent implements OnInit {

  id:string;

  constructor(private activatedRoute : ActivatedRoute) { 
    this.id= ''
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id || '';
      console.log(this.id);
      /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
    });
  }

}