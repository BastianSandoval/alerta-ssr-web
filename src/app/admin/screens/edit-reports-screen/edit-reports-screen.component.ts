import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ReportProviderService } from '../../../core/providers/report/report-provider.service'
import { Report} from '../../../core/models/report.model'
import { NotificationService} from '../../../core/services/notification/notification.service'


@Component({
  selector: 'app-edit-reports-screen',
  templateUrl: './edit-reports-screen.component.html',
  styleUrls: ['./edit-reports-screen.component.css']
})
export class EditReportsScreenComponent implements OnInit {

  

  id:string;
  form: FormGroup;

  constructor(private notificationService:NotificationService, private activatedRoute : ActivatedRoute,private reportProviderService: ReportProviderService) { // sin private no funciona
    this.id='';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id || '';
      /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
    });
  }

  // importForm(form: FormGroup){
  //   this.form= form;
  //   this.submitPlan();
  // }

  // public async submitPlan(): Promise<void> {
  //   if (this.form.valid) {
  //     console.log(this.form.value)
  //     if (this.id != '') {
  //       await this.updatePlan();
  //     } else {
  //       await this.addPlan(this.form);
  //     }
  //   }
  // }

  // public async updateProduct(): Promise<void> {
  //   try {
  //     if (this.changePhoto) {
  //       const fileName = this.imageChangedEvent.target.files[0].name;
  //       const img = this.base64ToFile(this.croppedImage, fileName);
  //       this.checkoutForm.get('image').setValue(img);
  //     }
  //     await this.reportProviderService.updateReport(this.reportId, this.checkoutForm.value, this.changePhoto).toPromise();
  //     this.notificationService.success('El producto ha sido actualizado');
  //   } catch (error) {
  //     console.log(error);
  //     this.notificationService.error('No se ha podido actualizar el producto');
  //   }
  // }

    // public async addPlan(form: FormGroup): Promise<void> {
  //   try {
  //     await this.reportProviderService.addReport(this.form.value).toPromise();
  //     this.notificationService.success('El plan ha sido creado');
  //     this.form.reset();
  //   } catch (error) {
  //     console.log(error);
  //     this.notificationService.error('No se ha podido crear el plan');
  //   }
  // }

  // public async updatePlan(): Promise<void> {
  //   try {
  //     await this.reportProviderService.updateReport(this.id, this.form.value as Report).toPromise();
  //     this.notificationService.success('El plan ha sido actualizado');
  //   } catch (error) {
  //     console.log(error);
  //     this.notificationService.error('No se ha podido actualizar el plan');
  //   }
  // }


}
