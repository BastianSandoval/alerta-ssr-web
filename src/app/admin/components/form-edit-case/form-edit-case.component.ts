import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Dog } from '@core/models/dog.model';
import { BreedProviderService } from '@core/providers/breed-provider/breed-provider.service';
import { DogService } from '@core/services/dogs/dogs.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-form-edit-case',
  templateUrl: './form-edit-case.component.html',
  styleUrls: ['./form-edit-case.component.css']
})
export class FormEditCaseComponent implements OnInit {

  @Input() id:string;

  @ViewChild('inputFile') inputFile: ElementRef;

  dogs: Dog[] = [];
  wantedDog!: Dog;
   newDog1?: Dog; 
  
  checkoutForm: FormGroup;
  breeds?: string[];
  image?: string;
  idDog!: string;

  public loader: boolean;
  public imageChangedEvent: any;
  public croppedImage: any;
  public changePhoto: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private breedProvider: BreedProviderService,
    private dogService: DogService,
    private activeRoute: ActivatedRoute
    
    ){
    this.checkoutForm = this.createFormGroup();
    this.createFormGroup();
    this.imageChangedEvent = null;
    this.changePhoto = false;
    this.loader = false;
    this.id = '';

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
        this.wantedDog = this.dogService.getDogById(this.idDog);
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

  //PARTE DE SUBIR FOTO

  public selectFile(event: any): void {
    this.imageChangedEvent = event;
    if (this.id) {
      this.changePhoto = true;
    }
  }

  public cancelPhotoChange(): void {
    this.inputFile.nativeElement.value = '';
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.changePhoto = false;
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  public base64ToFile(dataurl: any, filename: any): any {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

}
