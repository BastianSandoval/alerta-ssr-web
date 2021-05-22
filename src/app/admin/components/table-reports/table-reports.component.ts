import { Component, OnInit} from '@angular/core';
import { Report } from '../../../core/models/report.model';
import {ReportProviderService} from '../../../core/providers/report/report-provider.service';

@Component({
  selector: 'app-table-reports',
  templateUrl: './table-reports.component.html',
  styleUrls: ['./table-reports.component.css']
})
export class TableReportsComponent implements OnInit{

  reports: Report[];
  filterCategory!: string;
  value!: string;
  filterReport!: string;
  idSelected: any;
  reportSelected: boolean;
  reportsSlice!: Report[];
  sizePageTable: number = 7;
  startPage: number = 0;
  endPage: number = 7;
  visualizar:boolean;



  constructor(private reportProviderService: ReportProviderService) {
    this.reportSelected = false;
    this.visualizar=true;
    this.reports= [];
   }


  async ngOnInit(): Promise<void> {
    const data :any = await this.reportProviderService.getAllReports().toPromise(); 
    this.reports = data.docs;
    console.log(this.reports);
  }

  ngDoCheck(){
    this.reportsSlice = this.reports.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    if (this.startPage === 0) {
      prevButton?.setAttribute('disabled', 'disabled');

    } else {
      prevButton?.removeAttribute('disabled');
      
    }

    if (this.endPage >= this.reports.length) {
      nextButton?.setAttribute('disabled', 'disabled');      
    } else {
      nextButton?.removeAttribute('disabled');
    }
    
  }


  categoryFilter(event:any) {
    this.filterCategory = event.target.value;
  }

  clearFilter() {
    this.filterCategory = '';
    this.filterReport= '';
  }

  onValue(value: string) {
    this.value = value;
    if(this.value === ''){
      this.clearFilter();
    } else {
      this.filterReport = this.value;
    }
    
  }

  onEnter(value: string) {
    this.filterReport = value;
  }

  searchButton() {
    if(this.value){
      this.filterReport = this.value;
    }else{
      this.clearFilter();
    }
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

  selectReport(report: Report){
    this.reportSelected = true;

  }
}
