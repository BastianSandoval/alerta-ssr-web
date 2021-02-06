import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dog } from '@core/models/dog.model';
import { BreedProviderService } from '@core/providers/breed-provider/breed-provider.service';
import { DogService} from '../../../core/services/dogs/dogs.service';
@Component({
  selector: 'app-form-add-dog',
  templateUrl: './form-add-dog.component.html',
  styleUrls: ['./form-add-dog.component.css']
})
export class FormAddDogComponent implements OnInit {
  
  checkoutForm: FormGroup;
  breeds?: string[];
  image?: string;

  constructor(
    private breedProvider: BreedProviderService,
    private dogService: DogService,
    ){
    this.checkoutForm = this.createFormGroup();
    }

   async ngOnInit(): Promise<void> {
    try {
      this.breeds = await this.breedProvider.getBreed();
    } catch (error) {
      console.log(error)
    }
  }

  private createFormGroup() {
    return new FormGroup({
      nameDog: new FormControl('', [Validators.required]),
      nameOwner: new FormControl('',[Validators.required]),
      breed: new FormControl('',[Validators.required]),
    })
  }
  get nameDog() {return this.checkoutForm.get('nameDog');}
  get nameOwner() {return this.checkoutForm.get('nameOwner');}
  get breed() {return this.checkoutForm.get('breed');}

  
   public async addDog(){
    await this.getImage()
    let dog: Dog = {

      _id: Math.random().toString(),
      nameDog: this.checkoutForm.get('nameDog')?.value,
      nameOwner: this.checkoutForm.get('nameOwner')?.value,
      breed: this.checkoutForm.get('breed')?.value,
      image: this.image!
    };
    this.dogService.addDog(dog)
     // console.log(dog);
    ;
  }
   async getImage(){
    try {
      this.image = await this.breedProvider.getBreedImage(this.checkoutForm.get('breed')?.value,);
    } catch (error) {
      console.log(error)
     }
  } 

}
