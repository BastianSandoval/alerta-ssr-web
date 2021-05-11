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
  ngForm:FormGroupDirective;

  constructor(private notificationService:NotificationService, private activatedRoute : ActivatedRoute,private reportProviderService: ReportProviderService) { // sin private no funciona
    this.id='';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id || '';
      console.log(this.id);
      /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
    });
  }

  importForm(form: FormGroup){
    this.form= form;
    this.submitPlan();
  }

  importngForm(ngForm: FormGroupDirective){
    this.ngForm= ngForm;
    console.log(this.ngForm);
  }

  public async submitPlan(): Promise<void> {
    if (this.form.valid) {
      if (this.id != '') {
        await this.updatePlan();
      } else {
        await this.addPlan(this.form);
      }
    }
  }

  public async addPlan(form: FormGroup): Promise<void> {
    try {
      await this.reportProviderService.addReport(this.form.value).toPromise();
      this.notificationService.success('El plan ha sido creado');
      this.ngForm.resetForm(); // luego de enviar, se limpia
      this.form.reset();
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido crear el plan');
    }
  }

  public async updatePlan(): Promise<void> {
    try {
      console.log(this.form.value);
      await this.reportProviderService.updateReport(this.id, this.form.value as Report).toPromise();
      this.notificationService.success('El plan ha sido actualizado');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido actualizar el plan');
    }
  }
}
