import { Component, OnInit } from '@angular/core';
import { Report} from './../../../../core/models/report.model';
import { BreedProviderService } from '../../../../core/providers/breed-provider/breed-provider.service';
import { ReportsService} from '../../../../core/services/reports/reports.service'

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.css']
})
export class TableCategoryComponent implements OnInit {

  report: Report[];
  breeds?: string[];
  filterBreed!: string;
  reportSelected: any;
  value!: string;
  filterDog!: string;
  idSelected: any;
  reportsSlice!: Report[];
  sizePageTable: number = 7;
  
  startPage: number = 0;
  endPage: number = 7;

  constructor(private breedProvider: BreedProviderService, private reportService: ReportsService) {
    this.report = reportService.report;
    this.reportSelected = null;
    this.idSelected = null;
    this.reportSelected = null;
   }

  async ngOnInit(): Promise<void> {
    try {
      this.breeds = await this.breedProvider.getBreed();
    } catch (error) {
      console.log(error)
    };
  }

  ngDoCheck(){
    this.reportsSlice = this.report.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    if (this.startPage === 0) {
      prevButton?.setAttribute('disabled', 'disabled');

    } else {
      prevButton?.removeAttribute('disabled');
      
    }

    if (this.endPage >= this.report.length) {
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
