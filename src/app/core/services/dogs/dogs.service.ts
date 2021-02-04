import { Injectable } from '@angular/core';
import { Dog } from '../../models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {

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

  constructor() { }
}
