import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { Report } from '../../../core/models/report.model';
import { Commune } from '../../../core/models/commune.model';
import { Region } from '../../../core/models/region.model';
import { Institution } from '@core/models/institution.model';


import {ReportProviderService} from '../../../core/providers/report/report-provider.service';
import { CommuneProviderService } from '../../../core/providers/commune/commune-provider.service';
import { RegionProviderService } from '../../../core/providers/region/region-provider.service';
import { CategoryProviderService } from '../../../core/providers/category/category-provider.service';
import { InstitutionProviderService } from '../../../core/providers/institution/institution-provider.service';
import { CommentProviderService} from '../../../core/providers/comment/comment-provider.service';

import { TokenService } from '../../../core/services/token/token.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { Comment } from '@core/models/comment.model';


@Component({
  selector: 'app-perfil-screen',
  templateUrl: './perfil-screen.component.html',
  styleUrls: ['./perfil-screen.component.css']
})
export class PerfilScreenComponent implements OnInit {

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
  userId! : string;

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
  public comments$: Observable<Comment[]>;
  public institution$: Observable<Institution>;

  //cargar pagina
  public loader: boolean;


  constructor(
    private reportProviderService: ReportProviderService,
    private communeProviderService:CommuneProviderService,
    private regionProviderService:RegionProviderService,
    private notificationService:NotificationService,
    private tokenService: TokenService,
    private categoryProviderService: CategoryProviderService,
    private institutionProviderService: InstitutionProviderService,
    private commentProviderService: CommentProviderService
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

  setComment(){
    this.userId = JSON.parse(this.tokenService.getToken()).userId;
    this.institution$ = this.institutionProviderService.getInstitution(this.userId);
    this.comments$ = this.commentProviderService.getAllComments();

  }

  async setReport(dataCategory?: any){
    let data: any;
    if(this.isCategory){
      data = dataCategory;
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
    this.isCategory = false;
    console.log(this.reports);
  }
}
