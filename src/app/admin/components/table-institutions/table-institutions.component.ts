import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commune } from '@core/models/commune.model';
import { Institution } from '@core/models/institution.model';
import { Region } from '@core/models/region.model';
import { Report } from '@core/models/report.model';
import { CategoryProviderService } from '@core/providers/category/category-provider.service';
import { InstitutionProviderService } from '@core/providers/institution/institution-provider.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-table-institutions',
  templateUrl: './table-institutions.component.html',
  styleUrls: ['./table-institutions.component.css']
})
export class TableInstitutionsComponent implements OnInit {

  institutions: Institution[];
  communes: any;
  regions: Region[];
  filterCategory!: string;
  value!: string;
  filterReport!: string;
  idSelected: any;
  reportSelected: boolean;
  institutionSlice!: Institution[];
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
    private reportProviderService: InstitutionProviderService,
    private notificationService:NotificationService,
    private categoryProviderService: CategoryProviderService,
    private router: Router,
    ) {
    this.reportSelected = false;
    this.visualizar=true;
    this.institutions= [];
    this.loader = false;
   }


  async ngOnInit(): Promise<void> {
    
    await this.setInstitutions();
    this.categoryList = await this.categoryProviderService.getAllCategories().toPromise();
    this.institutions[0].categories = this.categoryList;
    console.log(this.institutions);
  }

  async ngOnChanges() {
  }

  async deleteItem(reportId){

    let index:number=0;
    console.log(reportId);
    await this.reportProviderService.deleteInstitution(reportId).toPromise();
    if (reportId){
      this.institutions.forEach((report: Institution) => {
        if (reportId === report._id) {
          this.institutions.splice(index,1);
        }
      index++;
      });

      this.setInstitutions();
      if (!this.institutions.length) {
        if (this.prevPages >= 1) {
          this.prevPage();
        }
      }
      this.router.navigate(['admin/institutions']);
      this.notificationService.success('Institución eliminada exitosamente');
    }
    else {
      this.notificationService.error('No fue posible eliminar la institución');
    }
  }


  institutionSelect(institution: Institution){
    this.idSelected = institution._id;
    console.log(institution._id);
    this.titleReport = institution.name;
    console.log(institution.name);
  }

  
  async ngDoCheck(){
    
    this.institutionSlice = this.institutions;

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

  async setInstitutions(){
    let data: Institution[];
    data = await this.reportProviderService.getAllInstitutions().toPromise();
    if(this.isCategory) {
      let dataFiltered: Institution[] = [];

      data.forEach(element => {
        for(let e of element.categories){
          if(this.filterCategory == e._id){
            dataFiltered.push(element);
            break; 
          } 
        };
      });
      data = dataFiltered;
    }
    if(this.filterReport){
      
    }
    
    
    //set queries
    this.totalDocs= data.length;
    this.hasNextPage= false;
    this.hasPrevPage= false;
    this.limit= data.length;
    this.nextPages= 0;
    this.page= 0;
    this.pagingCounter= 0;
    this.prevPages= 0;
    this.totalPages= 1;
   
    this.institutions = data;
    // this.communes = await this.communeProviderService.getAllCommunes().toPromise();
    // this.regions = await this.regionProviderService.getAllRegions().toPromise();

    // this.institutions.forEach((institutions) =>{
    //   // let location:any = institutions.location;
    //   this.communes.forEach((commune) =>{
    //     if(location.commune === commune._id){
    //       this.regions.forEach((region) => {
    //         if(commune.region._id === region._id){
    //           institutions.ubication = `${location.fullAddress}`
    //         }
    //       })
    //     }
    //   })
    // });

    this.loader = true;
  }


  async categoryFilter(event:any) {
    if(event.target.value != ''){
      this.isCategory = true;
      this.filterCategory = event.target.value;
      this.setInstitutions();
    }else{
      this.isCategory = false;
      this.setInstitutions();
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

  selectInstitution(report: Report){
    this.reportSelected = true;

  }
  
  //botones
  sizePage(event: any) {
    this.sizePageTable = parseInt(event.target.value);
    this.setInstitutions();
  }

  prevPage() {
    if(this.hasPrevPage){
      this.numberPage = this.prevPages;
      this.setInstitutions();
    }
  }

  nextPage() {
    if(this.hasNextPage){
      this.numberPage = this.nextPages;
      this.setInstitutions();
    }

  }

}
