import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../../core/models/report.model';
import {ReportProviderService} from '../../../core/providers/report/report-provider.service';

import { CommuneProviderService } from '../../../core/providers/commune/commune-provider.service';
import { RegionProviderService } from '../../../core/providers/region/region-provider.service';

import { Commune } from '../../../core/models/commune.model';
import { Region } from '../../../core/models/region.model';

import { NotificationService } from '@core/services/notification/notification.service';

import { CategoryProviderService } from '../../../core/providers/category/category-provider.service';
import { ValidatorProviderService } from '@core/providers/validator/validator-provider.service';
import { TokenService } from '@core/services/token/token.service';
import { Validator } from '@core/models/validator.model';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-table-validator',
  templateUrl: './table-validator.component.html',
  styleUrls: ['./table-validator.component.css']
})
export class TableValidatorComponent implements OnInit {

  validators: Validator[];
  communes: any;
  regions: Region[];
  filterCategory!: string;
  value!: string;
  filterReport: string = '';
  idSelected: any;
  reportSelected: boolean;
  reportsSlice!: Report[];
  sizePageTable: number = 7;
  startPage: number = 0;
  endPage: number = 7;
  visualizar:boolean;
  reportId : string;
  numberPage: number = 1;
  categoryList: any;
  titleReport: string;
  isCategory: boolean = false;
  dataCategory: any;
  userId : string;

  //response Query
  public totalDocs: number;
  public hasNextPage: boolean;
  public hasPrevPage: boolean;
  public limit: number;
  public nextPages: number;
  public page: number;
  public pagingCounter: number;
  public prevPages: number;
  public totalPages: number;

//cargar pagina
public loader: boolean;


  constructor(
    private reportProviderService: ReportProviderService,
    private communeProviderService:CommuneProviderService,
    private regionProviderService:RegionProviderService,
    private notificationService:NotificationService,
    private categoryProviderService: CategoryProviderService,
    private validatorProviderService: ValidatorProviderService,
    private tokenService: TokenService,
    ) {
    this.reportSelected = false;
    this.visualizar=true;
    this.validators= [];
    this.loader = false;
   }


  async ngOnInit(): Promise<void> {
    this.userId = JSON.parse(this.tokenService.getToken()).userId;
    this.setReport();
  }

  async ngOnChanges() {
  }

  
  async ngDoCheck(){

    // this.reportsSlice = this.reports.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    if (!this.hasPrevPage) {
      prevButton?.setAttribute('disabled', 'disabled');

    } else {
      prevButton?.removeAttribute('disabled');
      
    }

    if (!this.hasNextPage) {
      nextButton?.setAttribute('disabled', 'disabled');      
    } else {
      nextButton?.removeAttribute('disabled');
    }
    
  }

  async setReport(){
    let data: any;

     data = await this.validatorProviderService.getValidatorsOfIntitution(this.userId,this.numberPage,this.sizePageTable).toPromise();
    
    //set queries
   this.totalDocs= data.totalDocs;
   this.hasNextPage= data.hasNextPage;
   this.hasPrevPage= data.hasPrevPage;
   this.limit= data.limit;
   this.nextPages= data.nextPage;
   this.page= data.page;
   this.pagingCounter= data.pagingCounter;
   this.prevPages= data.prevPage;
   this.totalPages= data.totalPages;
  console.log("a");
   if(this.filterReport != '') {
    let validators = [];
    for (const item of data.docs) {
      if((item as Validator).rut?.startsWith(this.filterReport)){
        validators.push(item);
      }
    }
    this.validators = validators;
   } else {
    this.validators = data.docs;
   }
    this.loader = true;
  }

  clearFilter() {
    this.filterCategory = '';
    this.filterReport= '';
  }

  onValue(value: string) {
    this.value = value;
    if(this.value === ''){
      this.clearFilter();
      this.setReport();
    } else {
      this.filterReport = this.value;
      this.setReport();
    }
  }

  onEnter(value: string) {
    this.filterReport = value;
  }

  searchButton() {
    if(this.value){
      this.filterReport = this.value;
      this.setReport();
    }else{
      this.clearFilter();
    }
  }

  // selectReport(report: Report){
  //   this.reportSelected = true;

  // }
  
  //botones
  sizePage(event: any) {
    this.sizePageTable = parseInt(event.target.value);
    this.setReport();
  }

  prevPage() {
    if(this.hasPrevPage){
      this.numberPage = this.prevPages;
      this.setReport();
    }
  }

  nextPage() {
    if(this.hasNextPage){
      this.numberPage = this.nextPages;
      this.setReport();
    }
  }

}
