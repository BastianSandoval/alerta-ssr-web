import { Component, OnInit } from '@angular/core';
import { Report } from '../../../core/models/report.model';
import {ReportProviderService} from '../../../core/providers/report/report-provider.service';
import { Region } from '../../../core/models/region.model';
import { CategoryProviderService } from '../../../core/providers/category/category-provider.service';

import {EventProviderService} from '../../../core/providers/event/event-provider.service';
import { NotificationService } from '../../../core/services/notification/notification.service';

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
  eventosSlice!: any[];
  sizePageTable: number = 7;
  titleCase: string;
  isCategory: boolean = false;

  //Evento
  

  eventos: any[] = [{
    report:{
      title: '',
      category: {
        name: ''
      }
    }
  }];

  reporte: any;
  
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
    private eventProviderService: EventProviderService,
    private notificationService: NotificationService,
    private categoryProviderService: CategoryProviderService) {

    this.eventosSlice = []   
    this.reportSelected = false;
    this.reports= [];
    this.loader = false;
   }


  async ngOnInit(): Promise<void> {
    await this.setReport();

    this.categoryList = await this.categoryProviderService.getAllCategories().toPromise();

  }

  async ngDoCheck(){
    this.eventosSlice = this.eventos.slice(this.startPage, this.endPage);

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

  async deleteItem(eventId){
    let index:number=0;
    console.log(eventId);
    await this.eventProviderService.deleteEvent(eventId).toPromise();
    if (eventId){
      this.eventos.forEach((evento: any) => {
        if (eventId === evento._id) {
          this.eventos.splice(index,1);
        }
      index++;
      });
      this.setReport()
      if (!this.eventos.length) {
        if (this.prevPages >= 1) {
          this.prevPage();
        }
      }
      this.notificationService.success('Caso eliminado exitosamente');
    }else{
      this.notificationService.error('No fue posible eliminar el caso');
    }
  }
  
  async setReport(dataCategory?:any){
    let eventos: any;
    if(this.isCategory){
      eventos = dataCategory;
    }else{
      eventos = await this.eventProviderService.getEvents(this.numberPage,this.sizePageTable).toPromise();
    }
    //Events
    this.totalDocs= eventos.totalDocs;
    this.hasNextPage= eventos.hasNextPage;
    this.hasPrevPage= eventos.hasPrevPage;
    this.limit= eventos.limit;
    this.nextPages= eventos.nextPage;
    this.page= eventos.page;
    this.pagingCounter= eventos.pagingCounter;
    this.prevPages= eventos.prevPage;
    this.totalPages= eventos.totalPages;

    this.eventos = eventos.docs;

    for(const event of this.eventos){
      event.idReporte = event.complaints[event.complaints.length - 1]._id;
      console.log(event.idReporte);
      event.report = await this.reportProviderService.getReport(event.idReporte).toPromise();
      event.category = event.report.category.name;
      event.idCategory = event.report.category._id;
    }

   
    this.isCategory = false;
    this.loader = true;
    
  }


  async categoryFilter(event:any) {
    if(event.target.value != ''){
      this.isCategory = true;
      this.filterCategory = event.target.value;
      let data: any = await this.eventProviderService.getEventsPerCategory(this.filterCategory).toPromise();
      
      this.setReport(data)
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

  selectReport(event: any){
    this.reportSelected = true;

  }

}
