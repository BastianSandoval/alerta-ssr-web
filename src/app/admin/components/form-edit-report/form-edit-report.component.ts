import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Report } from '../../../core/models/report.model';
import { BreedProviderService } from '@core/providers/breed-provider/breed-provider.service';
import { DogService } from '@core/services/dogs/dogs.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import { google } from "google-maps";
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

import { FormService } from '../../../core/services/form/form.service';
import { ReportsService } from '../../../core/services/reports/reports.service';


declare var google : google;

@Component({
  selector: 'app-form-edit-report',
  templateUrl: './form-edit-report.component.html',
  styleUrls: ['./form-edit-report.component.css']
})
export class FormEditReportComponent implements OnInit, AfterViewInit{
  

  @Input() id:string;

  @ViewChild('inputFile') inputFile: ElementRef;

  @ViewChild('inputAddress') inputAddress: ElementRef;
  public autocomplete: google.maps.places.Autocomplete;

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  report: Report[] = [];
  // wantedDog!: Dog;
  //  newDog1?: Dog; 
  
  checkoutForm: FormGroup;
  userFormControl: FormControl;
  breeds?: string[];
  image?: string;
  idDog!: string;

  ////////////////////////////
  
  itemList = [];
  settings = {};
  count = 6;
////////////////////////////////
  public loader: boolean;
  public imageChangedEvent: any;
  public croppedImage: any;
  public changePhoto: boolean;

  public options: any;

  constructor(
    private formBuilder: FormBuilder,
    private breedProvider: BreedProviderService,
    private dogService: DogService,
    private activeRoute: ActivatedRoute,
    private reportService: ReportsService,
    private formService:FormService,
    
    ){
    this.checkoutForm ;
    this.userFormControl = new FormControl([],[Validators.required]);
    this.createFormGroup();
    this.imageChangedEvent = null;
    this.changePhoto = false;
    this.loader = false;
    this.id = '';

    this.itemList = [
      {"itemName":"India"},
      {"itemName":"Singapore"},
      {"itemName":"Australia"},
      {"itemName":"Canada"},
      {"itemName":"South Korea"},    
      {"itemName":"Brazil"}                      
    ];

    }

    fetchProducts(){
      this.report = this.reportService.getAllReports(); 
    };  

    ngOnInit(){
      // try {
      //   this.breeds = await this.breedProvider.getBreed();
      // } catch (error) {
      //   console.log(error)
      // }
      this.fetchProducts();

      // this.activeRoute.params.subscribe((params: Params) => {
      //   this.id = params.id;
      //   this.wantedDog = this.dogService.getDogById(this.idDog);
      //   /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
      // });

      

      // this.selectedItems = [
      //   {_id: "1",
      //   usuario:"Pablo",
      //   title: "Quema de camiones",
      //   category: "Ambiental",
      //   date: new Date(),
      //   location: "2 norte 1348, Viña del mar, Valparaiso",
      //   validation: {
      //       number: 100,
      //       date: new Date(),
      //   },
      //   reject: 20,
      //   description:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran.",
      //   numeroDenuncias: 22}];

      this.settings = {
        enableSearchFilter: true,
        addNewItemOnFilter: false,
        singleSelection: true,
        text:"Seleccionar Usuario",
        searchPlaceholderText:"Buscar",
        noDataLabel:"No Hay Resultado",
        primaryKey:"_id",
      };
      
  };

  public handleAddressChange(address: any) {
    console.log(address.geometry.location.lat())
}

  ngAfterViewInit() {
  }

  saveDog(event: Event){
    event.preventDefault(); 
  }


  // private createFormGroup() {
  //   return new FormGroup({
  //     title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*')]),
  //     category: new FormControl('',[Validators.required]),
  //     user: new FormControl('',[Validators.required]),
  //     location: new FormControl('',[Validators.required]),
  //     description: new FormControl('',[Validators.required]),
  //     date: new FormControl('',[Validators.required]),
  //   })
  // }


  public enviar(){
    console.log(this.checkoutForm)
  }

  private createFormGroup() {
      this.checkoutForm = this.formService.buildFormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*')]),
      category: new FormControl('',[Validators.required]),
      user: this.userFormControl,
      location: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
    })
  }

  public controlIsRequired(formControlName: string): boolean {
    return this.formService.controlIsRequired(this.checkoutForm, formControlName);
  }

  public controlIsInvalid(formControlName: string): boolean {
      return this.formService.controlIsInvalid(this.checkoutForm, formControlName);
  }

  public controlIsInvalidEmail(formControlName: string): boolean {
      return this.formService.controlIsInvalidEmail(this.checkoutForm, formControlName);
  }

  public controlIsInvalidPattern(formControlName: string): boolean {
    return this.formService.controlIsInvalidPattern(this.checkoutForm, formControlName);
  }

  public controlIsInvalidLength(formControlName: string): boolean {
    return this.formService.controlIsInvalidLength(this.checkoutForm, formControlName);
  }



  //  public async addDog(){
  //   await this.getImage()
  //   let dog: Dog = {

  //     _id: Math.random().toString(),
  //     nameDog: this.checkoutForm.get('nameDog')?.value,
  //     nameOwner: this.checkoutForm.get('nameOwner')?.value,
  //     breed: this.checkoutForm.get('breed')?.value,
  //     image: this.image!,
      
  //   };
  //   this.dogService.addDog(dog)
  //     console.log(dog);
    
  // };

  //  public async generateNewDog() {
  //   await this.getImage()
  //    let newDog: Dog = {
  //     _id: this.wantedDog._id,
  //     nameDog : this.checkoutForm.get('nameDog')?.value,
  //     nameOwner : this.checkoutForm.get('nameOwner')?.value,
  //     breed : this.checkoutForm.get('breed')?.value,
  //     image : this.image!
  //    };
  //     console.log(newDog);
  //      this.newDog1= newDog; 
  //  }

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


  //PARTE SELECCIONAR USUARIO



 
}
