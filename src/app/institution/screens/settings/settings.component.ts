import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form/form.service';
import { ConfigProviderService } from '../../../core/providers/config/config-provider.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Config } from '../../../core/models/config.model';
import { TokenService } from '../../../core/services/token/token.service';
import { InstitutionProviderService } from '@core/providers/institution/institution-provider.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  checkoutForm: FormGroup;
  userId: string;

  public id: string = '';
  public config: Config[]; 

  constructor(
    private formService:FormService,
    private configProviderService: ConfigProviderService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private institutionProviderService: InstitutionProviderService,
    ){

    this.checkoutForm;
    this.createFormGroup();

    }

  ngOnInit() {
    this.setReport();
  };

  async saveChange(event: Event, configForm: FormGroupDirective){
    event.preventDefault();
    let oldPassword: string = this.checkoutForm.value.oldPassword;
    let newPassword: string = this.checkoutForm.value.newPassword;
    let repeatNewPassword: string = this.checkoutForm.value.repeatNewPassword;
    const verificationPassword: any = {
      password: oldPassword
    }
    
    let password: any = await this.institutionProviderService.verificatePassword(this.userId, verificationPassword).toPromise();    

    if (configForm.valid) {
      if (password) {
        if (oldPassword !== newPassword) {
          if (newPassword === repeatNewPassword) {      
            const newPass: any = {
              password: this.checkoutForm.value.newPassword
            }     
            try {
              await this.institutionProviderService.changePassword(this.userId, newPass).toPromise();
              this.notificationService.success('La contraseña se ha cambiado exitosamente')      
            } catch (error) {
              console.log(error);
              this.notificationService.error('No se ha podido cambiar la contraseña')
            }         
          } else {
            this.notificationService.error('Las contraseñas no son iguales') 
          }  
        } else {
          this.notificationService.error('La contraseña nueva no debe ser la misma que la actual') 
        }        
      } else {
        this.notificationService.error('Contrasela actual incorrecta')
      }       
    }
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.pattern('')]), /* Validators.pattern('[a-zA-ZÀ-ÿ ]*') */
      newPassword: new FormControl('', [Validators.required, Validators.pattern('')]),
      repeatNewPassword: new FormControl('', [Validators.required, Validators.pattern('')]),
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
    this.userId = JSON.parse(this.tokenService.getToken()).userId;
  }


}
