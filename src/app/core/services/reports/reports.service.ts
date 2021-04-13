import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from '../../models/report.model';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { HttpService } from '../http/http.service';



@Injectable({
  providedIn: 'root'
})
export class ReportsService {

constructor(
  private router: Router,
  ) {}

 public addReport(newReport: Report){
   this.report.push(newReport) 
} 

public deleteReport(id:string){
  var indice: number;
    for (var i = 0; i< this.report.length; i++){
      if(this.report[i]._id == id){
        indice = this.report.indexOf(this.report[i]);
        /* this.router.navigate(['./admin/products']);  */
        return this.report.splice(indice, 1);
      }
    }
    return null;
}

  public editReport(id: string, newDog: Report){
    for (var i = 0; i< this.report.length; i++){
      if(this.report[i]._id === id){
        // this.report[i].nameDog = newDog.nameDog;
        // this.report[i].nameOwner = newDog.nameOwner;
        // this.report[i].breed = newDog.breed;
        // this.report[i].image = newDog.image;
        console.log(this.report[i]);
        return this.report[i];
      }
    }
    return null;
  }
  

  getReportById(id:string){
    for (var i = 0; i< this.report.length; i++){
      if(this.report[i]._id === id){
        console.log('holaa');
        console.log(this.report[i]);
        return this.report[i];
      }
    }   
    return this.report[i]; // ??? 
  }

  getAllReports(){
    return this.report
  }

  report: Report[] = [
    {
      _id: "1",
      usuario:"Pablo",
      title: "Quema de camiones",
      category: "Ambiental",
      date: new Date(),
      location: "2 norte 1348, Viña del mar, Valparaiso",
      validation: {
          number: 100,
          date: new Date(),
      },
      reject: 20,
      description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
    },
    {
      _id: "2",
      usuario:"Pablo",
      title: "Quema de camiones",
      category: "Bosque de Viña",
      date: new Date(),
      location: "2 norte 1348, Viña del mar, Valparaiso",
      validation: {
          number: 100,
          date: new Date(),
      },
      reject: 20,
      description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
    },
    {
      _id: "3",
      usuario:"Pablo",
      title: "Tala de arbol",
      category: "Bosque de Quilpue",
      date: new Date(),
      location: "2 norte 1348, Viña del mar, Valparaiso",
      validation: {
          number: 100,
          date: new Date(),
      },
      reject: 20,
      description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
    },
    {
      _id: "4",
      usuario:"Pablo",
      title: "Quema de bosque",
      category: "Vertedero Clandestino",
      date: new Date(),
      location: "2 norte 1348, Viña del mar, Valparaiso",
      validation: {
          number: 100,
          date: new Date(),
      },
      reject: 20,
      description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
    },
    {
      _id: "5",
      usuario:"Pablo",
      title: "Quema de bosque",
      category: "Vertedero Clandestino",
      date: new Date(),
      location: "2 norte 1348, Viña del mar, Valparaiso",
      validation: {
          number: 100,
          date: new Date(),
      },
      reject: 20,
      description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
    },
    {
      _id: "6",
      usuario:"Pablo",
      title: "Robo de basura",
      category: "Vertedero Clandestino",
      date: new Date(),
      location: "2 norte 1348, Viña del mar, Valparaiso",
      validation: {
          number: 100,
          date: new Date(),
      },
      reject: 20,
      description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
    },
    {
      _id: "7",
      usuario:"Pablo",
      title: "Robo de basura",
      category: "Vertedero Clandestino",
      date: new Date(),
      location: "2 norte 1348, Viña del mar, Valparaiso",
      validation: {
          number: 100,
          date: new Date(),
      },
      reject: 20,
      description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
    },

  ]

}

