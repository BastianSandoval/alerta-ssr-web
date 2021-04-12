import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Donation} from '../../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(
    private router: Router,
  ) {}
  
   public addReport(newReport: Donation){
     this.donation.push(newReport) 
  } 
  
  public deleteReport(id:string){
    var indice: number;
      for (var i = 0; i< this.donation.length; i++){
        if(this.donation[i]._id == id){
          indice = this.donation.indexOf(this.donation[i]);
          /* this.router.navigate(['./admin/products']);  */
          return this.donation.splice(indice, 1);
        }
      }
      return null;
  }
  
    public editReport(id: string, newDog: Donation){
      for (var i = 0; i< this.donation.length; i++){
        if(this.donation[i]._id === id){
          // this.report[i].nameDog = newDog.nameDog;
          // this.report[i].nameOwner = newDog.nameOwner;
          // this.report[i].breed = newDog.breed;
          // this.report[i].image = newDog.image;
          console.log(this.donation[i]);
          return this.donation[i];
        }
      }
      return null;
    }
    
  
    getReportById(id:string){
      for (var i = 0; i< this.donation.length; i++){
        if(this.donation[i]._id === id){
          console.log('holaa');
          console.log(this.donation[i]);
          return this.donation[i];
        }
      }   
      return this.donation[i]; // ??? 
    }
  
    getAllReports(){
      return this.donation
    }
  
    donation: Donation[] = [
      {
        _id: "1",
        username:"Pablo",
        donation: 5000,
      },
    ]
}
