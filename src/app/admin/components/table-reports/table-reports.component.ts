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


@Component({
  selector: 'app-table-reports',
  templateUrl: './table-reports.component.html',
  styleUrls: ['./table-reports.component.css']
})
export class TableReportsComponent implements OnInit{

  reports: Report[];
  communes: any;
  regions: Region[];
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
  reportId : string;
  numberPage: number = 1;
  categoryList: any;
  titleReport: string;
  isCategory: boolean = false;
  dataCategory: any;

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
    ) {
    this.reportSelected = false;
    this.visualizar=true;
    this.reports= [];
    this.loader = false;
   }


  async ngOnInit(): Promise<void> {
    
    this.setReport();

    this.categoryList = await this.categoryProviderService.getAllCategories().toPromise();

    // console.log(this.reports);
  }

  async ngOnChanges() {
  }

  async deleteItem(reportId){

    let index:number=0;
    console.log(reportId);
    await this.reportProviderService.deleteReport(reportId).toPromise();
    if (reportId){
      this.reports.forEach((report: Report) => {
        if (reportId === report._id) {
          this.reports.splice(index,1);
        }
      index++;
      });

      this.setReport();
      if (!this.reports.length) {
        if (this.prevPages >= 1) {
          this.prevPage();
        }
      }
      this.notificationService.success('Reporte eliminado exitosamente');
    }
    else {
      this.notificationService.error('No fue posible eliminar el reporte');
    }
  }


  reportSelect(report: Report){
    this.idSelected = report._id;
    console.log(report._id);
    this.titleReport = report.title;
    console.log(report.title);
  }

  
  async ngDoCheck(){

    this.reportsSlice = this.reports.slice(this.startPage, this.endPage);

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
    console.log(this.isCategory);
    if(this.isCategory){
      
      data = await this.reportProviderService.getComplaintsPerCategory(this.filterCategory,this.sizePageTable,this.numberPage).toPromise();
      console.log(data.docs);
    }else{
     data = await this.reportProviderService.getAllReports(this.numberPage,this.sizePageTable).toPromise();
     console.log(data)
    }
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
   
    this.reports = data.docs;
    this.communes = await this.communeProviderService.getAllCommunes().toPromise();
    this.regions = await this.regionProviderService.getAllRegions().toPromise();

    this.reports.forEach((report) =>{
      let location:any = report.location;
      this.communes.forEach((commune) =>{
        if(location.commune === commune._id){
          this.regions.forEach((region) => {
            if(commune.region._id === region._id){
              report.ubication = `${location.fullAddress}`
            }
          })
        }
      })
    });

    this.loader = true;
    console.log(this.reports);
  }


  async categoryFilter(event:any) {
    if(event.target.value != ''){
      this.isCategory = true;
      this.filterCategory = event.target.value;
      this.setReport();
    }else{
      this.isCategory = false;
      this.setReport();
    }

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

  selectReport(report: Report){
    this.reportSelected = true;

  }
  
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
