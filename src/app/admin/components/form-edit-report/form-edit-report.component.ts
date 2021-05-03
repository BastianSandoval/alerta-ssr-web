import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Report } from '../../../core/models/report.model';

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
export class FormEditReportComponent implements OnInit{
  

  @Input() id:string;

  @ViewChild('inputFile') inputFile: ElementRef;

  @ViewChild('inputAddress') inputAddress: ElementRef;
  public autocomplete: google.maps.places.Autocomplete;

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  report: Report[] = [];
  checkoutForm: FormGroup;
  userFormControl: FormControl;

////////////////////////////
  
  itemList = [];
  settings = {};
  count = 6;
///////////////////////////
  public loader: boolean;
  public imageChangedEvent: any;
  public croppedImage: any;
  public changePhoto: boolean;

  public options: any;

  constructor(
    private reportService: ReportsService,
    private formService:FormService,
    
    ){
    this.checkoutForm;
    this.userFormControl = new FormControl([],[Validators.required]);
    this.createFormGroup();
    this.imageChangedEvent = null;
    this.changePhoto = false;
    this.loader = false;
    this.id = '';

    this.itemList = [
      {"_id":1,"itemName":"India","name":"IN"},
      {"_id":2,"itemName":"Singapore","name":"SN"},
      {"_id":3,"itemName":"Australia","name":"AU"},
      {"_id":4,"itemName":"Canada","name":"CA"},
      {"_id":5,"itemName":"South Korea","name":"SK"},    
      {"_id":6,"itemName":"Brazil","name":"BR"},  
      {"_id":7,"itemName":"Brazil","name":"BR"}, 
      {"_id":8,"itemName":"Brazil","name":"BR"}                                   
    ];

    }

    fetchProducts(){
      this.report = this.reportService.getAllReports(); 
    };  

    ngOnInit(){
      this.fetchProducts();

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
    console.log(address.geometry.location.lat());
    console.log(address.name);
    //agrego ubicacion al formcontrol location
    this.checkoutForm.controls['location'].setValue(address.name);
}

  public saveReport(event: Event){
    event.preventDefault(); 
  }

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
