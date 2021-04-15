import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  baseUrl :string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl='https://restcountries.eu/rest/v2/regionalbloc/eu';
   }

   /* getAll(): Promise<any[]>{
     return this.httpClient.get<any[]>(this.baseUrl).toPromise();
   } */
   getAll(){
     return this.paises;
   }

   paises : Paises[] = [
     {
        lat:-33.045060,
        lng :-71.612811,
        located:false
     },
     {
      lat:-33.058274,
      lng :-71.647193,
      located:false
     },
     {
      lat:-33.036759,
      lng :-71.599581,
      located:false
     },
     {
      lat:-33.032063,
      lng : -71.617275,
      located:false
     },
     {
      lat:-33.037260,
      lng :-71.641219,
      located:false
     },
     {
      lat:-33.052841377951495,
      lng :-71.62616744130858,
      located:false
     }     
   ]

}
export interface Paises{
  lat: number;
  lng :number;
  located:boolean;
}
