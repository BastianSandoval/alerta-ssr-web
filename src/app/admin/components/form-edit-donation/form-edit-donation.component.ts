import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationAmount } from '@core/models/donation.model';
import { DonationAmountProviderService } from '@core/providers/donation-amount/donation-amount-provider.service';
import { FormService } from '@core/services/form/form.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-form-edit-donation',
  templateUrl: './form-edit-donation.component.html',
  styleUrls: ['./form-edit-donation.component.css']
})
export class FormEditDonationComponent implements OnInit {

  @Output() form: EventEmitter<FormGroup>;
  public donationForm: FormGroup;
  public id: string;
  public selectedDonation: DonationAmount;


  constructor(
    private activeRoute: ActivatedRoute,
    private formService: FormService,
    private donationProviderService: DonationAmountProviderService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.createFormGroup();
    this.form= new EventEmitter<FormGroup>();
  }

  async ngOnInit(): Promise<void> {

    this.setDonation();
  };

  public exportForm(){
    this.form.emit(this.donationForm); // mandamos el form a la screen
  }

  public enviar(){
    this.exportForm();
  }

  public saveDonation(event: Event, donationForm: FormGroupDirective ){
    event.preventDefault(); 
    if (this.donationForm.valid)
    // console.log(categoryForm);
    donationForm.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  private createFormGroup() {
      this.donationForm = this.formService.buildFormGroup(
      {
        amount: new FormControl( '', [Validators.required, Validators.pattern('[0-9 ]*') ]),
      }
    )
  }

  public controlIsRequired(formControlName: string): boolean {
    return this.formService.controlIsRequired(this.donationForm, formControlName);
  }

  public controlIsInvalid(formControlName: string): boolean {
      return this.formService.controlIsInvalid(this.donationForm, formControlName);
  }

  public controlIsInvalidEmail(formControlName: string): boolean {
      return this.formService.controlIsInvalidEmail(this.donationForm, formControlName);
  }

  public controlIsInvalidPattern(formControlName: string): boolean {
    return this.formService.controlIsInvalidPattern(this.donationForm, formControlName);
  }

  public controlIsInvalidLength(formControlName: string): boolean {
    return this.formService.controlIsInvalidLength(this.donationForm, formControlName);
  }

  public async setDonation(): Promise<void> {
    this.activeRoute.params.subscribe(async (params) => {
      this.id = params.id || '';
      if (this.id) {
        try {
          const data: any = await this.donationProviderService.getDonationAmount(this.id).toPromise();
          this.selectedDonation = data.category;

          this.donationForm.setValue({
            amount: data.amount,
          });
        } catch (error) {
          console.log(error);
          this.notificationService.error('No se ha podido cargar la donación');
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['admin/donations'])
  }

}
