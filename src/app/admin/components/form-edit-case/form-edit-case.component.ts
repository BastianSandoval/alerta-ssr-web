import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormService } from '../../../core/services/form/form.service';

@Component({
  selector: 'app-form-edit-case',
  templateUrl: './form-edit-case.component.html',
  styleUrls: ['./form-edit-case.component.css']
})
export class FormEditCaseComponent implements OnInit {

  @Input() id:string;

  @ViewChild('inputFile') inputFile: ElementRef;

  public checkoutForm: FormGroup;
  public loader: boolean;
  public imageChangedEvent: any;
  public croppedImage: any;
  public changePhoto: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private formService:FormService,
    
    ){
    this.checkoutForm;
    this.createFormGroup();
    this.imageChangedEvent = null;
    this.changePhoto = false;
    this.loader = false;
    this.id = '';

    }

   async ngOnInit(): Promise<void> {
      // this.activeRoute.params.subscribe((params: Params) => {
      //   this.id = params.id;
      //   console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id)
      // });
  };

  public saveCase(event: Event){
    event.preventDefault(); 
  }

  private createFormGroup() {
      this.checkoutForm = this.formService.buildFormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*')]),
      description: new FormControl('',[Validators.required]),
    })
  }

  public enviar(){
    console.log(this.checkoutForm.value);
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

}
