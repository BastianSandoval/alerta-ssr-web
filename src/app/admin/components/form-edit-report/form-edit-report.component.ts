import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Report } from '../../../core/models/report.model';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import { google } from "google-maps";
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

import { FormService } from '../../../core/services/form/form.service';
import { ReportProviderService} from '../../../core/providers/report/report-provider.service';
import { UserProviderService} from '../../../core/providers/user/user-provider.service';
import { User } from '../../../core/models/user.model'

import { NotificationService} from '../../../core/services/notification/notification.service'

import {RegionProviderService} from '../../../core/providers/region/region-provider.service';
import {Region} from '../../../core/models/region.model';
import {CommuneProviderService} from '../../../core/providers/commune/commune-provider.service';
import {Commune} from '../../../core/models/commune.model';
import {LocationProviderService} from '../../../core/providers/location/location-provider.service';
import {Location} from './../../../core/models/location.model';
import {CategoryProviderService} from '../../../core/providers/category/category-provider.service';
import {Category} from '../../../core/models/category.model';


declare var google : google;

@Component({
  selector: 'app-form-edit-report',
  templateUrl: './form-edit-report.component.html',
  styleUrls: ['./form-edit-report.component.css']
})
export class FormEditReportComponent implements OnInit{

  @Output() form: EventEmitter<FormGroup>;

  @Input() id:string;

  @ViewChild('inputFile') inputFile: ElementRef;

  @ViewChild('inputAddress') inputAddress: ElementRef;
  public autocomplete: google.maps.places.Autocomplete;

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  report: Report[] = [];
  reportId : string;
  checkoutForm: FormGroup;
  userFormControl: FormControl;
  categoryFormControl: FormControl;
  ngForm: FormGroupDirective;
  user : User[] = [];
  category: Category[] = [];
  address: any;
  selectedUser : User;
 

////////////////////////////
  
  itemList = [];
  settings = {};
  settingsCategories = {};
  count = 6;
///////////////////////////
  public loader: boolean;
  public imageChangedEvent: any;
  public croppedImage: any;
  public changePhoto: boolean;

  public options: any = {
    componentRestrictions: { country: "CL" },
  };


  //ids Api
  public idRegion: any;
  public idCommune: any;
  public idLocation: any;
  public idCategoria: any;
  

  constructor(
    private formService:FormService,
    private reportProviderService: ReportProviderService,
    private userProviderService:UserProviderService,
    private regionProviderService : RegionProviderService,
    private notificationService: NotificationService,
    private communeProviderService: CommuneProviderService,
    private locationProviderService: LocationProviderService,
    private categoryProviderService: CategoryProviderService,
    private route: ActivatedRoute,

    ){
    this.checkoutForm;
    this.userFormControl = new FormControl([],[Validators.required]);
    this.categoryFormControl = new FormControl([],[Validators.required]);
    this.createFormGroup();
    this.imageChangedEvent = null;
    this.changePhoto = false;
    this.loader = false;
    this.id = '';
    this.form= new EventEmitter<FormGroup>();
    }

    exportForm(){
      this.form.emit(this.checkoutForm); // mandamos el form a la screen
    }

    async ngOnInit(){
      const data :any = await this.reportProviderService.getAllReports().toPromise(); 
      this.report = data;

      const users:any= await this.userProviderService.getAllUsers().toPromise();
      this.user= users;

      const categories: any = await this.categoryProviderService.getAllCategories().toPromise();
      this.category = categories;

      this.settings = {
        labelKey: 'names',
        enableSearchFilter: true,
        addNewItemOnFilter: false,
        singleSelection: true,
        text:"Seleccionar Usuario",
        searchPlaceholderText:"Buscar",
        noDataLabel:"No Hay Resultado",
        primaryKey:"_id",
      };

      this.settingsCategories = {
        labelKey: 'name',
        enableSearchFilter: true,
        addNewItemOnFilter: false,
        singleSelection: true,
        text:"Seleccionar Categoria",
        searchPlaceholderText:"Buscar",
        noDataLabel:"No Hay Resultado",
        primaryKey:"_id",
      };

      this.setReport();
  };

  public handleAddressChange(address: any) {
    //agrego ubicacion al formcontrol location
    // this.checkoutForm.controls['location'].setValue(address.name);
    this.address = address;
    console.log(address);
    console.log(address.address_components.length);
    console.log(address.address_components[0].long_name); //ciudad
    console.log(address.address_components[1].long_name); //comuna
    console.log(address.address_components[3].long_name); //region
    console.log(address.geometry.location.lat()); //lat
    console.log(address.geometry.location.lng()); //long

    //guardar region
    this.saveRegion(this.address);
    
  }

  //conectar con providers
  public async saveRegion(address: any){
    try{
      if(address.address_components.length < 5){
       var region: Region = {
          name: address.address_components[2].long_name
        }
      }else {
       var region: Region = {
          name: address.address_components[3].long_name
        }
      }

      let regiones: Region[] = await this.regionProviderService.getAllRegions().toPromise();
            
      let result = (regiones.find(data => data.name == region.name.toLowerCase()));

      if(!result){
       console.log("no se encontro");
       await this.regionProviderService.addRegion(region)
       .subscribe(data => {
         this.idRegion = data._id;
        });
      } else {
         this.idRegion = result._id;
      }

      //guardar comuna
      this.saveCommune(this.address);
      
    } catch(error){
      console.log(error);
      this.notificationService.error('No se ha podido guardar ubicacion');
    }
  }


  public async saveCommune(address: any){
    try{
      console.log(this.idRegion);
      if(address.address_components.length < 5){
       var commune: Commune = {
          name: address.address_components[0].long_name,
          region: this.idRegion
        }
      }else {
        var commune: Commune = {
          name: address.address_components[1].long_name,
          region: this.idRegion
        }
      }

      let communes: Commune[] = await this.communeProviderService.getAllCommunes().toPromise();
            
      let result = (communes.find(data => data.name == commune.name.toLowerCase()));

      if(!result){
       console.log("no se encontro");
       console.log(commune);
       await this.communeProviderService.addCommune(commune)
       .subscribe((data) => {
         this.idCommune = data._id;
        });
      } else {
         this.idCommune = result._id;
      }

      //guardar Location
      this.saveLocation(this.address);
      
    } catch(error){
      console.log(error);
      this.notificationService.error('No se ha podido guardar ubicacion');
    }
  }

  public async saveLocation(address: any){
    try{
      console.log(this.idCommune);
      if(address.address_components.length < 5){
       var location: Location = {
          latitude: address.geometry.location.lat().toString(),
          longitude: address.geometry.location.lng().toString(),
          commune: this.idCommune
        }
      }else {
        var location: Location = {
          latitude: address.geometry.location.lat().toString(),
          longitude: address.geometry.location.lng().toString(),
          commune: this.idCommune
        }
      }

      let locations: Location[] = await this.locationProviderService.getAllLocations().toPromise();
            
      let result = (locations.find(data => data.latitude == location.latitude && data.longitude == location.longitude));

      if(!result){
       console.log("no se encontro");
       console.log(location);
       await this.locationProviderService.addLocation(location)
       .subscribe((data) => {
         this.idLocation= data._id;
        });
      } else {
         this.idLocation = result._id;
      }
      
    } catch(error){
      console.log(error);
      this.notificationService.error('No se ha podido guardar ubicacion');
    }
  }


  public saveReport(event: Event, reportForm: FormGroupDirective ){
    event.preventDefault();
    //hacer lista de categorias

    this.checkoutForm.get('user').setValue(this.userFormControl.value[0]._id);
    this.checkoutForm.get('category').setValue(this.categoryFormControl.value[0]._id);
    
    // this.userFormControl.setValue(this.userFormControl.value[0]._id);
    // this.categoryFormControl.setValue(this.categoryFormControl.value[0]._id);
     this.checkoutForm.controls['location'].setValue(this.idLocation);
  

    console.log(this.checkoutForm.value);

    if (reportForm.valid)
    this.submitReport();
    reportForm.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  private createFormGroup() {
      this.checkoutForm = this.formService.buildFormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*')]),
      category: this.categoryFormControl,
      user: this.userFormControl,
      location: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      imageUrl: ['', []],
      image: ['', [ ]],
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

  //PARTE DE SUBIR FOTO

  public selectFile(event: any): void {
    this.imageChangedEvent = event;
    if (this.id) {
      this.changePhoto = true;
    }
  }

  public formData : FormData;

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

  public async submitReport(): Promise<void> {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value)
      if (this.id != '') {
        await this.updateReport();
      } else {
        await this.addReport(this.checkoutForm);
      }
    }
  }

   public async addReport(form: FormGroup): Promise<void> {
    try {
      const fileName = this.imageChangedEvent.target.files[0].name;
      const img = this.base64ToFile(this.croppedImage, fileName);
      this.checkoutForm.get('image').setValue(img);

      await this.reportProviderService.addReport(this.checkoutForm.value).toPromise();
      this.notificationService.success('El plan ha sido creado');
      this.checkoutForm.reset();
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido crear el plan');
    }
  }

  public async setReport(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.id = params.id || '';
      if (this.id) {
        try {
          const data: any = await this.reportProviderService.getReport(this.id).toPromise();
          this.selectedUser = data.user;
          let date = this.fromJsonDate(data.createdAt);

          this.checkoutForm.setValue({
            title: data.title,
            category:'',
            user: '',            
            location: data.location,
            description: data.description,
            date: date,
            imageUrl: data.imageUrl,
            image: ''
          });
          this.userFormControl.setValue([data.user]);
          this.categoryFormControl.setValue([data.category]);
          
        } catch (error) {
          console.log(error);
          this.notificationService.error('No se ha podido cargar el producto');
        }
      }
    });
  }

  
  public async updateReport(): Promise<void> {
    try {
      if (this.changePhoto) {
        const fileName = this.imageChangedEvent.target.files[0].name;
        const img = this.base64ToFile(this.croppedImage, fileName);
        this.checkoutForm.get('image').setValue(img);
      }
      await this.reportProviderService.updateReport(this.id, this.checkoutForm.value, this.changePhoto).toPromise();
      this.notificationService.success('El producto ha sido actualizado');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido actualizar el producto');
    }
  }


  fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);  //Ignore time
  }


}
