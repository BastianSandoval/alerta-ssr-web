import { Component, OnInit } from '@angular/core';
import { BreedProviderService } from '../../../core/providers/breed-provider/breed-provider.service';

import { Donation} from '../../../core/models/donation.model'
import { DonationService } from '../../../core/services/donation/donation.service';


@Component({
  selector: 'app-table-donations',
  templateUrl: './table-donations.component.html',
  styleUrls: ['./table-donations.component.css']
})
export class TableDonationsComponent implements OnInit {

  donation: Donation[];
  breeds?: string[];
  filterBreed!: string;
  donationSelected: any;
  value!: string;
  filterDonation!: string;
  idSelected: any;
  donationsSlice!: Donation[];
  sizePageTable: number = 7;
  
  startPage: number = 0;
  endPage: number = 7;

  constructor(private breedProvider: BreedProviderService, private donationService: DonationService) {
    this.donation = donationService.donation;
    this.donationSelected = null;
    this.idSelected = null;
   }

  async ngOnInit(): Promise<void> {
    try {
      this.breeds = await this.breedProvider.getBreed();
    } catch (error) {
      console.log(error)
    };
  }

  ngDoCheck(){
    this.donationsSlice = this.donation.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    if (this.startPage === 0) {
      prevButton?.setAttribute('disabled', 'disabled');

    } else {
      prevButton?.removeAttribute('disabled');
      
    }

    if (this.endPage >= this.donation.length) {
      nextButton?.setAttribute('disabled', 'disabled');      
    } else {
      nextButton?.removeAttribute('disabled');
    }
    
  }


  breedFilter(event:any) {
    this.filterBreed = event.target.value;
  }

  clearFilter() {
    this.filterBreed = '';
    this.filterDonation = '';
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
    this.filterDonation = this.value;
  }
  
  sizePage(event: any) {
    this.sizePageTable = parseInt(event.target.value);
    this.startPage = 0;
    this.endPage = this.sizePageTable;

  }

  prevPage() {
    this.endPage = this.startPage;
    this.startPage = this.startPage - this.sizePageTable;
  }

  nextPage() {
    this.startPage = this.endPage;
    this.endPage = this.endPage + this.sizePageTable;
  }


}
