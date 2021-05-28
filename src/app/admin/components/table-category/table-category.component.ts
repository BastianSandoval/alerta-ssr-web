import { Component, OnInit } from '@angular/core';
import { CategoryProviderService} from '../../../core/providers/category/category-provider.service';
import { Category} from '../../../core/models/category.model';
import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { Report} from '../../../core/models/report.model';
import { NotificationService } from '@core/services/notification/notification.service';



@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.css']
})
export class TableCategoryComponent implements OnInit {

  breeds?: string[];
  category: Category[];
  filterBreed!: string;
  dogSelected: any;
  value!: string;
  filterReport!: string;
  idSelected: any;
  categorySelected: any;
  categorysSlice!: Category[];
  sizePageTable: number = 7;
  
  startPage: number = 0;
  endPage: number = 7;
  public mostrar:Boolean;
  visualizar:boolean;



  constructor(private categoryProviderService: CategoryProviderService,
              private reportProviderService: ReportProviderService,
              private notificationService: NotificationService
    ) {
    this.categorySelected =null;
    this.category= [];
    this.visualizar=true;
   }


   async ngOnInit(): Promise<void> {
    const data :any = await this.categoryProviderService.getAllCategories().toPromise(); 
    this.category = data;
    
  }

  ngDoCheck(){
    this.categorysSlice = this.category.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    if (this.startPage === 0) {
      prevButton?.setAttribute('disabled', 'disabled');

    } else {
      prevButton?.removeAttribute('disabled');
      
    }

    if (this.endPage >= this.category.length) {
      nextButton?.setAttribute('disabled', 'disabled');      
    } else {
      nextButton?.removeAttribute('disabled');
    }
    
  }

  categorySelect(category: Category){
    this.idSelected = category._id;
  }

  async deleteItem(categoryId){
    let index:number=0;
    let existeReporte : any = await this.reportProviderService.getComplaintsPerCategory(categoryId).toPromise();
    console.log(existeReporte.docs);
    if (!existeReporte.docs.length){
      await this.categoryProviderService.deleteCategory(categoryId).toPromise();
      if (categoryId){
        this.category.forEach((category: Category) => {
          if (categoryId === category._id) {
            this.category.splice(index,1);
          }
        index++;
        });
        const data :any = await this.categoryProviderService.getAllCategories().toPromise(); 
        this.category = data;
        this.notificationService.success('Categoria eliminado exitosamente');
      }
    }
    else{
        this.notificationService.warning('No es posible eliminar, reportes vinculados a la categoría correspondiente');
    }
  }


  categoryFilter(event:any) {
    this.filterReport = event.target.value;
  }

  clearFilter() {
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

  selectReport(category: Category){
    this.categorySelected =category;

  }

  show(mostrar:boolean){
    if (!mostrar){
      this.mostrar=true;
    }else{
      this.mostrar=false;
    }
  }

}