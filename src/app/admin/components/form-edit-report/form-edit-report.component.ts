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
  checkoutForm: FormGroup;
  userFormControl: FormControl;
  ngForm: FormGroupDirective;
  user : User[] = [];
  id_user:string;

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
    private formService:FormService,
    private reportProviderService: ReportProviderService,
    private userProviderService:UserProviderService
    ){
    this.checkoutForm;
    this.userFormControl = new FormControl([],[Validators.required]);
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
  };

  public handleAddressChange(address: any) {
    //agrego ubicacion al formcontrol location
    this.checkoutForm.controls['location'].setValue(address.name);
  }


  public saveReport(event: Event, reportForm: FormGroupDirective ){
    event.preventDefault(); 
    
    // console.log(this.userFormControl.value());
    this.id_user= this.userFormControl.value;
    console.log((this.id_user[0]));
    if (reportForm.valid)
    this.exportForm();
    reportForm.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  private createFormGroup() {
      this.checkoutForm = this.formService.buildFormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*')]),
      category: new FormControl('',[Validators.required]),
      user: this.userFormControl,
      location: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      imageUrl: ['', []],
      image: ['', [ ]],
    })
  }

  guardarImage(){
    const fileName = this.imageChangedEvent.target.files[0].name;
    const img = this.base64ToFile(this.croppedImage, fileName);
    this.checkoutForm.get('image').setValue(img);
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
