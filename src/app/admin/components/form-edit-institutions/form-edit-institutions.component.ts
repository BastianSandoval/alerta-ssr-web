import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Report } from '../../../core/models/report.model';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import { google } from 'google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

import { FormService } from '../../../core/services/form/form.service';
import { ReportProviderService} from '../../../core/providers/report/report-provider.service';
import { UserProviderService} from '../../../core/providers/user/user-provider.service';
import { User } from '../../../core/models/user.model';

import { NotificationService} from '../../../core/services/notification/notification.service';

import {RegionProviderService} from '../../../core/providers/region/region-provider.service';
import {Region} from '../../../core/models/region.model';
import {CommuneProviderService} from '../../../core/providers/commune/commune-provider.service';
import {Commune} from '../../../core/models/commune.model';
import {LocationProviderService} from '../../../core/providers/location/location-provider.service';
import {Location} from './../../../core/models/location.model';
import {CategoryProviderService} from '../../../core/providers/category/category-provider.service';
import {Category} from '../../../core/models/category.model';
import { Institution } from '../../../core/models/institution.model';
import { InstitutionProviderService } from '../../../core/providers/institution/institution-provider.service';
import { AddressProviderService } from '../../../core/providers/address/address-provider.service';
import { Address } from '../../../core/models/address.model';


declare var google: google;
@Component({
  selector: 'app-form-edit-institutions',
  templateUrl: './form-edit-institutions.component.html',
  styleUrls: ['./form-edit-institutions.component.css']
})
export class FormEditInstitutionsComponent implements OnInit {

  @Output() form: EventEmitter<FormGroup>;

  @Input() id: string;

  @ViewChild('inputFile') inputFile: ElementRef;

  @ViewChild('inputAddress') inputAddress: ElementRef;
  public autocomplete: google.maps.places.Autocomplete;

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  report: Report[] = [];
  reportId: string;
  checkoutForm: FormGroup;
  userFormControl: FormControl;
  categoryFormControl: FormControl;
  communesFormControl: FormControl;
  communeFormControl: FormControl;
  ngForm: FormGroupDirective;
  user: User[] = [];
  category: Category[] = [];
  regions: Region[] = [];
  communes: Commune[] = [];
  commune: Commune;
  address: any;
  selectedUser: User;
  fechaActual: Date = new Date();

////////////////////////////

  itemList = [];
  settings = {};
  settingsRegions = {};
  settingsCommunes = {};
  settingsCommune = {};
  settingsCategories = {};
  count = 6;
///////////////////////////
  public loader: boolean;
  public imageChangedEvent: any;
  public croppedImage: any;
  public changePhoto: boolean;
  public disableButton: boolean;

  public options: any = {
    componentRestrictions: { country: 'CL' },
  };


  //ids Api
  public idRegion: any;
  public idCommune: any;
  public idLocation: any;
  public idCategoria: any;
  public ubicacion : any;


  constructor(
    private formService:FormService,
    private institutionProviderService: InstitutionProviderService,
    private addressProviderService: AddressProviderService,
    private userProviderService: UserProviderService,
    private regionProviderService : RegionProviderService,
    private notificationService: NotificationService,
    private communeProviderService: CommuneProviderService,
    private locationProviderService: LocationProviderService,
    private categoryProviderService: CategoryProviderService,
    private route: ActivatedRoute,
    private router: Router,

    ){
      this.checkoutForm;
      this.userFormControl = new FormControl([],[Validators.required]);
      this.categoryFormControl = new FormControl([],[Validators.required]);
      this.communesFormControl = new FormControl([],[Validators.required]);
      this.communeFormControl = new FormControl([],[Validators.required]);
      this.createFormGroup();
      this.imageChangedEvent = null;
      this.changePhoto = false;
      this.loader = false;
      this.id = '';
      this.disableButton = false;
      this.form= new EventEmitter<FormGroup>();
      this.ubicacion = {
        region: '',
        commune: '',
        latitude: '',
        longitude: '',
        fullAddress: '', 
        streetName: '', 
        streetNumber: ''
      }; 
      
    }

    exportForm(){
      this.form.emit(this.checkoutForm); // mandamos el form a la screen
    }

    async ngOnInit(){
      const categories: any = await this.categoryProviderService.getAllCategories().toPromise();
      this.category = categories;

      const communes: any = await this.communeProviderService.getAllCommunes().toPromise();
      this.communes = communes;

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

      this.settingsCommunes = {
        labelKey: 'name',
        enableSearchFilter: true,
        addNewItemOnFilter: false,
        singleSelection: false,
        text:"Seleccionar Communas",
        searchPlaceholderText:"Buscar",
        noDataLabel:"No Hay Resultado",
        position: "top",
        autoPosition:false,
        primaryKey:"_id",
      };
      this.settingsCommune = {
        labelKey: 'name',
        enableSearchFilter: true,
        addNewItemOnFilter: false,
        singleSelection: true,
        text:"Seleccionar Communas",
        searchPlaceholderText:"Buscar",
        noDataLabel:"No Hay Resultado",
        position: "top",
        autoPosition:false,
        enableFilterSelectAll: true,
        primaryKey:"_id",
      };

      this.settingsCategories = {
        labelKey: 'name',
        enableSearchFilter: true,
        addNewItemOnFilter: false,
        singleSelection: false,
        text:"Seleccionar Categoría",
        searchPlaceholderText:"Buscar",
        noDataLabel:"No Hay Resultado",
        position: "top",
        autoPosition:false,
        primaryKey:"_id"
      };

      this.setReport();  
  };

  public handleAddressChange(address: any) {
    //agrego ubicacion al formcontrol location
    // this.checkoutForm.controls['location'].setValue(address.name);
    this.address = this.checkoutForm.value.location;
    console.log(address);

    //guardar region
    for (let i = 0; i < address.address_components.length; i++) {
      if(address.address_components[i].types[0] === "administrative_area_level_1"){
        this.ubicacion.region = address.address_components[i].long_name;
      }
      if(address.address_components[i].types[0] === "administrative_area_level_3"){
        this.ubicacion.commune = address.address_components[i].long_name;
      } else if (address.address_components[i].types[0] === "colloquial_area"){
        this.ubicacion.commune = address.address_components[i].long_name
      }
      if(address.address_components[i].types[0] === "street_number"){
        this.ubicacion.streetNumber = ' ' + parseInt(address.address_components[i].long_name) + ', ';
      }
      if(address.address_components[i].types[0] === "route"){
        this.ubicacion.streetName = address.address_components[i].long_name;
      }

    }
    this.ubicacion.fullAddress = `${this.ubicacion.streetName}${this.ubicacion.streetNumber}${this.ubicacion.commune}, ${this.ubicacion.region}`;
    console.log(this.ubicacion.fullAddress);
    this.ubicacion.latitude = address.geometry.location.lat().toString();
    this.ubicacion.longitude = address.geometry.location.lng().toString();
    this.saveRegion();
    
  }
  // name: string;
  // address: string | Address;
  // atentionHour: string;
  // phonesNumbers: string[]; 
  // profilePictureUrl: string;
  // email?: string;
  // password?: string;
  // description: string;
  // categories: Category[];
  // assignedCommunes: Commune[];
  // comments: string[];

  //conectar con providers
  public async saveRegion(){
    try{
      
      console.log(this.ubicacion.region)
      var region: Region = {
        name: this.ubicacion.region? this.ubicacion.region : ''
      }

      let regiones: Region[] = await this.regionProviderService.getAllRegions().toPromise();
            
      let result = (regiones.find(data => data.name == region.name.toLowerCase()));

      if(!result){
       console.log("no se encontro");
        this.regionProviderService.addRegion(region)
       .subscribe(data => {
         this.idRegion = data._id;

         //guardar comuna
         this.saveCommune();

        });
      } else {
         this.idRegion = result._id;

         //guardar comuna
         this.saveCommune();
      }
      
      
    } catch(error){
      console.log(error);
      this.notificationService.error('No se ha podido guardar ubicacion');
    }
  }


  public async saveCommune(){
    try{

      console.log(this.idRegion);
      var commune: Commune = {
        name: this.ubicacion.commune? this.ubicacion.commune : '' ,
        region: this.idRegion? this.idRegion : ''
      }

      let communes: Commune[] = await this.communeProviderService.getAllCommunes().toPromise();
            
      let result = (communes.find(data => data.name == commune.name.toLowerCase()));

      if(!result){
       console.log("no se encontro");
       console.log(commune);
       this.communeProviderService.addCommune(commune)
       .subscribe((data) => {
         this.idCommune = data._id;
         console.log(data._id);

          //guardar Location
          this.saveLocation();

        });
      } else {
         this.idCommune = result._id;

         //guardar Location
         this.saveLocation();
      }
      console.log(this.idCommune);
     
      
    } catch(error){
      console.log(error);
      this.notificationService.error('No se ha podido guardar ubicacion');
    }
  }

  public async saveLocation(){
    try{

      var location: Location = {
        latitude: this.ubicacion.latitude,
        longitude: this.ubicacion.longitude,
        fullAddress: this.ubicacion.fullAddress,
        commune: this.idCommune? this.idCommune: ''
      }
      let locations: Location[] = await this.locationProviderService.getAllLocations().toPromise();
            
      let result = (locations.find(data => data.latitude == location.latitude && data.longitude == location.longitude));

      if(!result){
       console.log("no se encontro");
       console.log(location);
       this.locationProviderService.addLocation(location)
       .subscribe((data) => {
         this.idLocation= data._id;
        });
      } else {
        this.idLocation = result._id;
        console.log('id encontrado: ', this.idLocation)
      }
      
    } catch(error){
      console.log(error);
      this.notificationService.error('No se ha podido guardar ubicacion');
    }
  }


  public saveReport(event: Event, reportForm: FormGroupDirective ){
    event.preventDefault();
    //hacer lista de categorias
    this.disableButton = true;
    
    
    /* this.userFormControl.setValue(this.userFormControl.value[0]._id);
    this.categoryFormControl.setValue(this.categoryFormControl.value[0]._id); */
    this.checkoutForm.controls['address'].setValue(this.idLocation);

    this.submitReport(reportForm);
     // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
    /* this.checkoutForm.controls['location'].setValue(this.address) */
    
    if (this.id === '') {
      // this.checkoutForm.reset();
      // reportForm.resetForm();      
    }

  }

  public changeInput(event: any) {
    this.disableButton = false;
    
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      name: ['', [ ]],
      address: ['', [ ]],
      atentionHourD: ['', [ ]],
      atentionHourH: ['', [ ]],
      atentionHour: ['', [ ]],
      phonesNumbers: ['', [ ]],
      email: ['', [ ]],
      password: ['', [ ]],
      description: ['', [ ]],
      categories: ['', [ ]],
      commune: ['', [ ]],
      street: ['', [ ]],
      streetNumber: ['', [ ]],
      assignedCommunes: ['', [ ]],
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

  public async submitReport(institution: FormGroupDirective): Promise<void> {
    
    if (this.categoryFormControl.valid && this.communeFormControl.valid && this.communesFormControl.valid) {
      let catList: String[] = [];
      this.categoryFormControl.value.forEach(element => {
        catList.push(element._id)
      });
      let communeList: String[] = [];
      this.communesFormControl.value.forEach(element => {
        communeList.push(element._id)
      });
      this.checkoutForm.get('categories').setValue(catList);
      this.checkoutForm.get('assignedCommunes').setValue(communeList);
      let address: Address;
      console.log(this.checkoutForm.get('street').value),
      console.log(this.checkoutForm.get('streetNumber').value),
      console.log(this.communeFormControl.value[0]._id),
      this.checkoutForm.get('address').setValue( await this.addressProviderService.addAddress({
        streetName: this.checkoutForm.get('street').value,
        streetNumber: this.checkoutForm.get('streetNumber').value,
        commune: this.communeFormControl.value[0]._id,
      }).toPromise());
      console.log("llega hasta aqui");
      this.checkoutForm.get('atentionHour').setValue(`${this.checkoutForm.get('atentionHourD').value} - ${this.checkoutForm.get('atentionHourH').value}`);
      console.log(this.checkoutForm.valid);
      if (this.checkoutForm.valid) {
        if (this.id != '') {
          await this.updateReport();
        } else {
          console.log("llega hasta aqui");
          await this.addInstitution(this.checkoutForm, institution);
        }
        // institution.resetForm()
      }
      console.log("llega hasta aqui");
    }
  }
  //!
  public async addInstitution(form: FormGroup, institution: FormGroupDirective): Promise<void> {
    try {
      // const fileName = this.imageChangedEvent.target.files[0].name;
      // console.log(this.imageChangedEvent.target.files)
      // const img = this.base64ToFile(this.croppedImage, fileName);
      // this.checkoutForm.get('image').setValue(img);
      console.log(this.checkoutForm.value);
      await this.institutionProviderService.addInstitution(
        this.checkoutForm.value
      ).toPromise();
      // this.checkoutForm.reset();
      // institution.resetForm();
      this.router.navigate(['admin/institutions']);
      this.notificationService.success('La institución ha sido creado');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido crear la institución');
    }
  }

  public async setReport(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.id = params.id || '';
      if (this.id) {
        try {
          let commune: Commune;
          const data: Institution = await this.institutionProviderService.getInstitution(this.id).toPromise();
          const data2: Institution = await this.institutionProviderService.getInfoInstitution(this.id).toPromise();
          if(data.address != null )
          commune = await this.communeProviderService.getCommune(data.address.commune).toPromise();
          // this.selectedUser = data.name;
          // let date = this.fromJsonDate(data.createdAt);

          // this.idLocation = data.location._id;
          
          // let commune : any = await this.communeProviderService.getCommune(data.location.commune).toPromise();
          // let region = await this.regionProviderService.getRegion(commune.region._id).toPromise();

          // let ubication : string = `${data.location.fullAddress}`;
          
          this.checkoutForm.setValue({
            name: data.name,
            commune: data.address != null ? commune : '',
            street: data.address != null ? data.address.streetName : '',
            streetNumber: data.address != null ? data.address.streetNumber : '',
            address: data.address,
            atentionHourD: data.atentionHour.substring(8,13),            
            atentionHourH: data.atentionHour.substring(0,5), 
            atentionHour: data.atentionHour,          
            phonesNumbers: data.phonesNumbers,
            email: data2.email ?? '',
            password: data.password ?? '',
            description: data.description,
            categories: data.categories,
            assignedCommunes: data.assignedCommunes,
          });
          console.log(data.atentionHour.slice(8,13));
          this.userFormControl.setValue([data]);
          this.categoryFormControl.setValue(data.categories);
          this.communesFormControl.setValue(data.assignedCommunes);
          if(data.address != null)
            this.communeFormControl.setValue([commune]);
          console.log(data);
          
        } catch (error) {
          console.log(error);
          this.notificationService.error('No se ha podido cargar el reporte');
        }
      }
    });
  }

  
  public async updateReport(): Promise<void> {
    try {
      // if (this.changePhoto) {
      //   const fileName = this.imageChangedEvent.target.files[0].name;
      //   const img = this.base64ToFile(this.croppedImage, fileName);
      //   this.checkoutForm.get('image').setValue(img);
      // }
      
      await this.institutionProviderService.updateInstitution(this.id, this.checkoutForm.value).toPromise();
      this.router.navigate(['admin/institutions']);
      this.notificationService.success('La institución ha sido actualizada');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido actualizar la institución');
    }
  }


  fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);  //Ignore time
  }

  cancel() {
    this.router.navigate(['admin/institutions'])
  }

}
