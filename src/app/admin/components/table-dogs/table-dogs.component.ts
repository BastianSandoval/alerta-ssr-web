import { Component, OnInit } from '@angular/core';
import { BreedProviderService } from '../../../core/providers/breed-provider/breed-provider.service';
import { Dog } from '../../../core/models/dog.model';
import { DogService } from '../../../core/services/dogs/dogs.service';

@Component({
  selector: 'app-table-dogs',
  templateUrl: './table-dogs.component.html',
  styleUrls: ['./table-dogs.component.css']
})
export class TableDogsComponent implements OnInit {

  breeds?: string[];
  dogs: Dog[];
  filterBreed!: string;
  dogSelected: any;
  value!: string;
  filterDog!: string;
  idSelected: any;
  nameDogSelected: any;
  dogsSlice!: Dog[];
  sizePageTable: number = 7;
  
  startPage: number = 0;
  endPage: number = 7;



  constructor(private breedProvider: BreedProviderService, private dogService: DogService) {
    this.dogs = dogService.dog;
    this.dogSelected = null;
    this.idSelected = null;
    this.nameDogSelected = null;
   }

  async ngOnInit(): Promise<void> {
    try {
      this.breeds = await this.breedProvider.getBreed();
    } catch (error) {
      console.log(error)
    };
  }

  ngDoCheck(){
    this.dogsSlice = this.dogs.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    if (this.startPage === 0) {
      prevButton?.setAttribute('disabled', 'disabled');

    } else {
      prevButton?.removeAttribute('disabled');
      
    }

    if (this.endPage >= this.dogs.length) {
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
    this.filterDog = '';
  }

  onValue(value: string) {
    this.value = value;
  }

  onEnter(value: string) {
    this.filterDog = value;
  }

  searchButton() {
    this.filterDog = this.value;
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
