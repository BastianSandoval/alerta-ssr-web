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
import { Institution } from '@core/models/institution.model';
import { TokenService } from '@core/services/token/token.service';
import { InstitutionProviderService } from '@core/providers/institution/institution-provider.service';

@Component({
  selector: 'app-table-reports',
  templateUrl: './table-reports.component.html',
  styleUrls: ['./table-reports.component.css']
})
export class TableReportsComponent implements OnInit {

  reports: Report[];
  reportsShow: any[];
  communes: any;
  regions: Region[];
  filterCategory!: string;
  value!: string;
  filterReport!: string;
  idSelected: any;
  reportSelected: boolean;
  reportsSlice!: Report[];
  sizePageTable: number = 9;
  startPage: number = 0;
  endPage: number = 9;
  visualizar:boolean;
  reportId : string;
  numberPage: number = 1;
  categoryList: any;
  titleReport: string;
  isCategory: boolean = false;
  userId!: string;

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
  public institution: Institution;

//cargar pagina
public loader: boolean;


  constructor(
    private reportProviderService: ReportProviderService,
    private communeProviderService:CommuneProviderService,
    private regionProviderService:RegionProviderService,
    private notificationService:NotificationService,
    private categoryProviderService: CategoryProviderService,
    private tokenService: TokenService,
    private institutionProviderService: InstitutionProviderService,
    ) {
    this.reportSelected = false;
    this.visualizar=true;
    this.reports= [];
    this.loader = false;
    this.reportsShow = [];
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
    /* console.log(reportId); */
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
    /* console.log(report._id); */
    this.titleReport = report.title;
    /* console.log(report.title); */
  }

  
  async ngDoCheck(){

    this.reportsSlice = this.reports;

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

  async setReport() {
    this.userId = JSON.parse(this.tokenService.getToken()).userId;
    this.institution = await this.institutionProviderService.getInstitution(this.userId).toPromise();
    /* console.log(this.institution); */
    

    let data: any;
    if(this.isCategory){
      data = await this.reportProviderService.getComplaintsPerCategory(this.filterCategory, this.sizePageTable, this.numberPage).toPromise();
    }else{
      data = await this.reportProviderService.getAllReports(this.numberPage, this.sizePageTable).toPromise();      
    }
    console.log(data);
    
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
    /* this.setReportShow(this.reports, this.institution) */
    /* console.log(this.reports); */
    

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
    
  }

  /* async setReportShow(reports: any[], institution: any) {
    
    institution.categories.forEach((category) => {        
      let index = 0;
      reports.forEach((report) => {      
        if (report.category.name !== category.name) {
          this.reports.splice(index,1);
        }
        index++;
      })
    })

    if (!this.reports.length) {
      if (this.prevPages >= 1) {
        this.prevPage();
      }
    }
  } */

  async setReportShow(reports: any[], institution: any) {
    let i = 0;
    reports.forEach((report) => {      
      institution.categories.forEach((category) => {        
        if (report.category._id === category._id) {
          this.reportsShow.push(report)
          console.log(report);
          
        }
      })
    })
  }


  async categoryFilter(event:any) {
    if(event.target.value != ''){
      this.isCategory = true;
      this.filterCategory = event.target.value;
      this.setReport()
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
