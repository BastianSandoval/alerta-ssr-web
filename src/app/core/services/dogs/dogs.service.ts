import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dog } from '../../models/dog.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DogService {

constructor(private router: Router) {}

 public addDog(newDog: Dog){
   this.dog.push(newDog) 
} 
public deleteDog(id:string){
  var indice: number;
    for (var i = 0; i< this.dog.length; i++){
      if(this.dog[i]._id == id){
        indice = this.dog.indexOf(this.dog[i]);
        /* this.router.navigate(['./admin/products']);  */
        return this.dog.splice(indice, 1);
      }
    }
    return 
}

  public editDog(id: string, newDog: Dog){
    for (var i = 0; i< this.dog.length; i++){
      if(this.dog[i]._id === id){
        this.dog[i].nameDog = newDog.nameDog;
        this.dog[i].nameOwner = newDog.nameOwner;
        this.dog[i].breed = newDog.breed;
        this.dog[i].image = newDog.image;
        console.log(this.dog[i]) 
      }
    }
    return 
  }
  

  getDogById(id:string){
    for (var i = 0; i< this.dog.length; i++){
      if(this.dog[i]._id === id){
        console.log('holaa');
        console.log(this.dog[i]);
        return this.dog[i];
      }
    }   
    return this.dog[i]; // ??? 
  }

  getAllDogs(){
    return this.dog
  }



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

}
