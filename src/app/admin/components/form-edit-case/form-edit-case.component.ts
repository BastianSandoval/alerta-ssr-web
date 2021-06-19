import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormService } from '../../../core/services/form/form.service';

import { NotificationService} from '../../../core/services/notification/notification.service';

import { ReportProviderService} from '../../../core/providers/report/report-provider.service';
import { Report } from '../../../core/models/report.model';

import { EventProviderService } from '../../../core/providers/event/event-provider.service';

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
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private reportProviderService: ReportProviderService,
    private eventProviderService: EventProviderService,
    private router: Router,
    ){
    this.checkoutForm;
    this.createFormGroup();
    this.imageChangedEvent = null;
    this.changePhoto = false;
    this.loader = false;
    this.id = '';

    }

   async ngOnInit(): Promise<void> {
      this.setReport();
  };

  public saveCase(event: Event, reportForm: FormGroupDirective){
    event.preventDefault(); 

    console.log(this.checkoutForm.value);
    if (reportForm.valid){
      this.submitReport();
      reportForm.resetForm();
    }

  }

  private createFormGroup() {
      this.checkoutForm = this.formService.buildFormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*')]),
      description: new FormControl('',[Validators.required]),
      imageUrl: ['', []],
      image: ['', [ ]],
      category: new FormControl('',[Validators.required]),
      user: new FormControl('',[Validators.required]),
      location: new FormControl('',[Validators.required]),
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

  //traer datos

  public async setReport(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.id = params.id || '';
      if (this.id) {
        try {
          const data: any = await this.reportProviderService.getReport(this.id).toPromise();
          console.log(data);
          this.checkoutForm.setValue({
            title: data.title,        
            description: data.description,
            imageUrl: data.imageUrl,
            image: '',
            category: data.category._id,
            user: data.user._id, 
            location: data.location._id,
          });
          
        } catch (error) {
          console.log(error);
          this.notificationService.error('No se ha podido cargar el caso');
        }
      }
    });
  }


  public async submitReport(): Promise<void> {
    if (this.checkoutForm.valid) {
      await this.updateReport();
    }
  }

  public async updateReport(): Promise<void> {
    try {
      if (this.changePhoto) {
        const fileName = this.imageChangedEvent.target.files[0].name;
        const img = this.base64ToFile(this.croppedImage, fileName);
        this.checkoutForm.get('image').setValue(img);
      }
      console.log(this.checkoutForm.value)
      this.router.navigate(['admin/cases']);
      await this.reportProviderService.updateReport(this.id, this.checkoutForm.value, this.changePhoto).toPromise();
      this.notificationService.success('El caso ha sido actualizado');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido actualizar el caso');
    }
  }

  cancel() {
    this.router.navigate(['admin/cases'])
  }

}


