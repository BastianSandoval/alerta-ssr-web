import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Dog } from '@core/models/dog.model';
import { BreedProviderService } from '@core/providers/breed-provider/breed-provider.service';
import { DogService } from '@core/services/dogs/dogs.service';
@Component({
  selector: 'app-form-edit-category',
  templateUrl: './form-edit-category.component.html',
  styleUrls: ['./form-edit-category.component.css']
})
export class FormEditCategoryComponent implements OnInit {

  dogs: Dog[] = [];
  wantedDog!: Dog;
   newDog1?: Dog; 
  
  checkoutForm: FormGroup;
  breeds?: string[];
  image?: string;
  id!: string;
  constructor(
    private formBuilder: FormBuilder,
    private breedProvider: BreedProviderService,
    private dogService: DogService,
    private activeRoute: ActivatedRoute
    
    ){
    this.checkoutForm = this.createFormGroup();
    this.createFormGroup();

    }

    fetchProducts(){
      this.dogs = this.dogService.getAllDogs(); 
    }; 

   async ngOnInit(): Promise<void> {
      try {
        this.breeds = await this.breedProvider.getBreed();
      } catch (error) {
        console.log(error)
      }
      this.fetchProducts();

      this.activeRoute.params.subscribe((params: Params) => {
        this.id = params.id;
        this.wantedDog = this.dogService.getDogById(this.id);
        /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
      });
  };

  saveDog(event: Event){
    event.preventDefault(); 
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
      image: this.image!,
      
    };
    this.dogService.addDog(dog)
      console.log(dog);
    
  };

   public async generateNewDog() {
    await this.getImage()
     let newDog: Dog = {
      _id: this.wantedDog._id,
      nameDog : this.checkoutForm.get('nameDog')?.value,
      nameOwner : this.checkoutForm.get('nameOwner')?.value,
      breed : this.checkoutForm.get('breed')?.value,
      image : this.image!
     };
      console.log(newDog);
       this.newDog1= newDog; 
   }

   async getImage(){
    try {
      this.image = await this.breedProvider.getBreedImage(this.checkoutForm.get('breed')?.value,);
    } catch (error) {
      console.log(error)
     }
  } 

}
