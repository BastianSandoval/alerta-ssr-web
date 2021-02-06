import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dog } from '../../models/dog.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DogService {

constructor() {}

 public addDog(newDog: Dog){
   this.dog.push(newDog) 
} 

  dog: Dog[] = [
    {
      _id: '1',
      nameDog: 'Luca',
      nameOwner: 'David',
      image: '',
      breed: '',
    },
    {
      _id: '2',
      nameDog: 'Puppy',
      nameOwner: 'Exequiel',
      image: '',
      breed: '',
    },

  ]

}
