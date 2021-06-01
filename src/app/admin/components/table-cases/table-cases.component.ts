import { Component, OnInit } from '@angular/core';
import { Report } from '../../../core/models/report.model';
import {ReportProviderService} from '../../../core/providers/report/report-provider.service';
import { Region } from '../../../core/models/region.model';
import { RegionProviderService } from '../../../core/providers/region/region-provider.service';
import { CommuneProviderService } from '../../../core/providers/commune/commune-provider.service';
import { CategoryProviderService } from '../../../core/providers/category/category-provider.service';

@Component({
  selector: 'app-table-cases',
  templateUrl: './table-cases.component.html',
  styleUrls: ['./table-cases.component.css']
})
export class TableCasesComponent implements OnInit {

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
  numberPage: number = 1;
  categoryList: any;

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
    private regionProviderService:RegionProviderService,
    private communeProviderService:CommuneProviderService,
    private categoryProviderService: CategoryProviderService) {
    this.reportSelected = false;
    this.reports= [];
    this.loader = false;
   }


  async ngOnInit(): Promise<void> {
    this.setReport()
    console.log(this.reports);

    this.categoryList = await this.categoryProviderService.getAllCategories().toPromise();
  }

  ngDoCheck(){
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
      this.setReport()
    }
  }
  
  async setReport(){
    const data :any = await this.reportProviderService.getAllReports(this.numberPage,this.sizePageTable).toPromise();
    this.reports = data.docs;
    this.totalDocs= data.totalDocs;
    this.hasNextPage= data.hasNextPage;
    this.hasPrevPage= data.hasPrevPage;
    this.limit= data.limit;
    this.nextPages= data.nextPage;
    this.page= data.page;
    this.pagingCounter= data.pagingCounter;
    this.prevPages= data.prevPage;
    this.totalPages= data.totalPages;


    this.communes = await this.communeProviderService.getAllCommunes().toPromise();
    this.regions = await this.regionProviderService.getAllRegions().toPromise();

    this.reports.forEach((report) =>{
      let location:any = report.location;
      this.communes.forEach((commune) =>{
        if(location.commune === commune._id){
          this.regions.forEach((region) => {
            if(commune.region._id === region._id){
              report.ubication = `${location.streetName} ${location.streetNumber}, ${commune.name}, ${region.name}`
              console.log(report.ubication);
            }
          })
        }
      })
    });

    this.loader = true;
    console.log(this.reports);
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

  selectReport(report: Report){
    this.reportSelected = true;

  }

}
