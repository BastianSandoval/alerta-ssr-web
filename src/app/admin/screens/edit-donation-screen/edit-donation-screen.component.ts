import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DonationAmount } from '@core/models/donation.model';
import { DonationAmountProviderService } from '@core/providers/donation-amount/donation-amount-provider.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-edit-donation-screen',
  templateUrl: './edit-donation-screen.component.html',
  styleUrls: ['./edit-donation-screen.component.css']
})
export class EditDonationScreenComponent implements OnInit {

  public id: string;
  public form: FormGroup;

  constructor(
    private notificationService: NotificationService, 
    private donationProvider: DonationAmountProviderService, 
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) { 
    this.id = ''
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id || '';
      /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
    });
  }

  importForm(form: FormGroup){
    this.form= form;
    this.submitDonation();
  }

  public async submitDonation(): Promise<void> {
    if (this.form.valid) {
      if (this.id != '') {
        await this.updateDonation();
      } else {
        await this.addDonation(this.form);
      }
    }
  }

  public async addDonation(form: FormGroup): Promise<void> {
    try {
      await this.donationProvider.addDonationAmount(this.form.value).toPromise();
      this.router.navigate(['admin/donations']);
      this.notificationService.success('La opción de donación ha sido creada');
      this.form.reset();
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido crear la opción de donación');
    }
  }

  public async updateDonation(): Promise<void> {
    try {
      console.log(this.form.value);
      await this.donationProvider.updateDonationAmount(this.id, this.form.value as DonationAmount).toPromise();
      this.router.navigate(['admin/donations']);
      this.notificationService.success('La opción de donación ha sido actualizada');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido actualizar la opción de donación');
    }
  }

}
