import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { FormService } from '@core/services/form/form.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  public checkoutForm: FormGroup;

  public passwordVisibility: boolean;


  constructor(
    private notificationService: NotificationService,
    private formService: FormService,
    private authService: AuthService,
  ) { 
    this.checkoutForm;
    this.passwordVisibility = false;
    this.createFormGroup();
  }

  ngOnInit(): void {
  }


  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('',[Validators.required]),
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

  public async login(form: FormGroupDirective): Promise<void> {
   
    if (this.checkoutForm.valid) {
      try {
        await this.authService.login(this.checkoutForm.value).toPromise();
      } catch (error) {
        if (error.message === 'Access denied!') {
          this.notificationService.error('Tu cuenta no esta registrada como administrador');
        } else {
          this.notificationService.error('Los datos ingresados son incorrectos');
        }
      }
    }
  }


  public togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }


}
