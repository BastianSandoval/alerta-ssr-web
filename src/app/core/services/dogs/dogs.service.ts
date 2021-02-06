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
      nameOwner: 'David Godoy',
      image: 'https://images.dog.ceo/breeds/hound-ibizan/n02091244_4914.jpg',
      breed: 'hound-ibizan',
    },
    {
      _id: '2',
      nameDog: 'Puppy',
      nameOwner: 'Exequiel Andrade',
      image: 'https://images.dog.ceo/breeds/hound-basset/n02088238_2879.jpg',
      breed: 'hound-basset',
    },
    {
      _id: '3',
      nameDog: 'Rayo',
      nameOwner: 'Nicolas',
      image: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_3582.jpg',
      breed: 'hound-afghan',
    },
    {
      _id: '4',
      nameDog: 'Peluche',
      nameOwner: 'Sebastian',
      image: 'https://images.dog.ceo/breeds/hound-blood/n02088466_8039.jpg',
      breed: 'hound-blood',
    },

  ]

  constructor() { }
}
