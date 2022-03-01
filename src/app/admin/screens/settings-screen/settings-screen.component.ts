import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form/form.service';
import { ConfigProviderService } from '../../../core/providers/config/config-provider.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Config } from '../../../core/models/config.model';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.css']
})
export class SettingsScreenComponent implements OnInit {

  public id: string = '';
  public config: Config[];
  
  checkoutForm: FormGroup;
  constructor(
    private formService:FormService,
    private configProviderService: ConfigProviderService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    ){

    this.checkoutForm;
    this.createFormGroup();

    }

  ngOnInit() {
    this.setReport();
  };

  saveChange(event: Event, configForm: FormGroupDirective){
    event.preventDefault();
    if(configForm.valid){
      console.log(this.checkoutForm.value);
      this.submitConfig();
    }
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      currentLocationRadius: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      anotherLocationRadius: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      minimalChecks: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      minimalRejections: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
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

  public async submitConfig(): Promise<void> {
    if (this.checkoutForm.valid) {
      if (this.config[0]) {
        await this.updateConfig();
      } else {
        await this.addConfig(this.checkoutForm);
      }
    }
  }

  public async addConfig(form: FormGroup): Promise<void> {
    try {
      await this.configProviderService.addConfig(this.checkoutForm.value).toPromise();
      this.notificationService.success('La configuración ha sido creado');
      this.checkoutForm.reset();
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido crear la configuración');
    }
  }

  public async updateConfig(): Promise<void> {
    try {
      await this.configProviderService.updateConfig(this.config[0]._id, this.checkoutForm.value).toPromise();
      this.notificationService.success('La configuración ha sido actualizado');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido actualizar la configuración');
    }
  }


  public async setReport(): Promise<void> {
    try {
        this.config = await this.configProviderService.getAllConfigs().toPromise();
        if(this.config.length === 1){
          this.checkoutForm.setValue({
            currentLocationRadius: this.config[0].currentLocationRadius,
            anotherLocationRadius: this.config[0].anotherLocationRadius,
            minimalChecks: this.config[0].minimalChecks,            
            minimalRejections: this.config[0].minimalRejections
          });
        }
    }catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido cargar el producto');
    }

  }

}
