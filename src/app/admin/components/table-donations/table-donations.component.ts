import { Component, OnInit } from '@angular/core';
import { DonationAmountProviderService } from '@core/providers/donation-amount/donation-amount-provider.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { DonationAmount} from '../../../core/models/donation.model'

@Component({
  selector: 'app-table-donations',
  templateUrl: './table-donations.component.html',
  styleUrls: ['./table-donations.component.css']
})
export class TableDonationsComponent implements OnInit {

  public donations: DonationAmount[];
  public value!: string;
  public filterDonation: string;
  public idSelected: any;
  public donationSelected: any;
  public donationsSlice!: DonationAmount[];
  public sizePageTable: number = 7;
  public titleDonation: number;
  public startPage: number = 0;
  public endPage: number = 7;
  public mostrar:Boolean;
  public visualizar:boolean;
  public numberPage: number = 1;
  public numberPages:number = 1;
  public page: number = 1;
  public loader: boolean;

  constructor(
    private donationProvider: DonationAmountProviderService,
    private notificationService: NotificationService
  ) {
    this.donationSelected =null;
    this.donations= [];
    this.visualizar=true;
    this.loader = false;
  }

  async setDonations(){
    const data :any = await this.donationProvider.getAllDonationAmounts().toPromise(); 
    this.donations = data;
    this.numberPages = Math.ceil(this.donations.length / this.sizePageTable) ;
  }

  async ngOnInit(): Promise<void> {
    this.setDonations();
    this.loader = true;
  }

  ngDoCheck(){
    this.donationsSlice = this.donations.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    if (this.startPage === 0) {
      prevButton?.setAttribute('disabled', 'disabled');

    } else {
      prevButton?.removeAttribute('disabled');
      
    }

    if (this.endPage >= this.donations.length) {
      nextButton?.setAttribute('disabled', 'disabled');      
    } else {
      nextButton?.removeAttribute('disabled');
    }
    
  }

  selectDonation(donationAmount: DonationAmount){
    this.idSelected = donationAmount._id;
    this.titleDonation = donationAmount.amount;
  }

  async deleteDonation(){
    try {
      let index = 0;
      await this.donationProvider.deleteDonationAmount(this.idSelected).toPromise();

      this.donations.forEach((donation: DonationAmount) => {
        if (this.idSelected === donation._id) {
          this.donations.splice(index, 1);
        }
        index++;
      });

      const data: any = await this.donationProvider.getAllDonationAmounts().toPromise(); 
      this.donations = data;
      this.numberPages = Math.ceil(this.donations.length / this.sizePageTable);
      if (!this.donationsSlice.length) {
        if (this.numberPages >= 1) {
          this.prevPage();
        }
      }
      this.notificationService.success('Opción de donación eliminada exitosamente');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido eliminar la opción de donación');
    }
  }


  donationFilter(event:any) {
    this.filterDonation = event.target.value;
  }

  clearFilter() {
    this.filterDonation= '';
  }

  onValue(value: string) {
    this.value = value;
    if(this.value === ''){
      this.clearFilter();
    } else {
      this.filterDonation = this.value;
    }
    
  }

  onEnter(value: string) {
    this.filterDonation = value;
  }

  searchButton() {
    if(this.value){
      this.filterDonation = this.value;
    }else{
      this.clearFilter();
    }
  }
  
  sizePage(event: any) {
    this.sizePageTable = parseInt(event.target.value);
    this.numberPages = Math.ceil(this.donations.length / this.sizePageTable) ;

    this.startPage = 0;
    this.endPage = this.sizePageTable;

  }

  prevPage() {
    this.endPage = this.startPage;
    this.startPage = this.startPage - this.sizePageTable;
    this.page--;
  }

  nextPage() {
    this.startPage = this.endPage;
    this.endPage = this.endPage + this.sizePageTable;
    this.page++;
  }
  
  show(mostrar:boolean){
    if (!mostrar){
      this.mostrar=true;
    }else{
      this.mostrar=false;
    }
  }


}
