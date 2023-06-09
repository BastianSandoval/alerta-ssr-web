import { Component, OnInit } from '@angular/core';
import { CategoryProviderService } from '../../../core/providers/category/category-provider.service';
import { Category } from '../../../core/models/category.model';
import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { Report } from '../../../core/models/report.model';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.css'],
})
export class TableCategoryComponent implements OnInit {
  breeds?: string[];
  category: Category[];
  filterBreed!: string;
  dogSelected: any;
  value!: string;
  filterCategory!: string;
  idSelected: any;
  categorySelected: any;
  categorysSlice!: Category[];
  sizePageTable: number = 20;
  titleCategory: string;

  startPage: number = 0;
  endPage: number = 20;
  public mostrar: Boolean;
  visualizar: boolean;
  numberPage: number = 1;

  //buttoms pages
  numberPages: number = 1;
  page: number = 1;

  //cargar pagina
  public loader: boolean;

  constructor(
    private categoryProviderService: CategoryProviderService,
    private reportProviderService: ReportProviderService,
    private notificationService: NotificationService
  ) {
    this.categorySelected = null;
    this.category = [];
    this.visualizar = true;
    this.loader = false;
  }

  async setCategory() {
    let data: any;
    console.log(this.filterCategory);
    if(!!this.filterCategory) {
      data = await this.categoryProviderService
      .searchCategories(this.filterCategory)
      .toPromise();
    } else {
      data = await this.categoryProviderService
      .getAllCategories()
      .toPromise();
    }
    this.category = data;

    this.numberPages = Math.ceil(this.category.length / this.sizePageTable);
  }

  async ngOnInit(): Promise<void> {
    this.setCategory();
    this.loader = true;
  }

  ngDoCheck() {
    this.categorysSlice = this.category.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById('prevButton');
    let nextButton = document.getElementById('nextButton');

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

  categorySelect(category: Category) {
    this.idSelected = category._id;
    this.titleCategory = category.name;
  }

  async deleteItem(categoryId) {
    let index: number = 0;
    let existeReporte: any = await this.reportProviderService
      .getComplaintsPerCategory(categoryId)
      .toPromise();
    if (!existeReporte.docs.length) {
      await this.categoryProviderService.deleteCategory(categoryId).toPromise();
      if (categoryId) {
        this.category.forEach((category: Category) => {
          if (categoryId === category._id) {
            this.category.splice(index, 1);
          }
          index++;
        });
        const data: any = await this.categoryProviderService
          .getAllCategories()
          .toPromise();
        this.category = data;
        this.numberPages = Math.ceil(this.category.length / this.sizePageTable);
        if (!this.categorysSlice.length) {
          if (this.numberPages >= 1) {
            this.prevPage();
          }
        }
        this.notificationService.success('Categoría eliminado exitosamente');
      }
    } else {
      this.notificationService.warning(
        'No es posible eliminar, reportes vinculados a la categoría correspondiente'
      );
    }
  }

  categoryFilter(event: any) {
    this.filterCategory = event.target.value;
  }

  clearFilter() {
    this.filterCategory = '';
  }

  onValue(value: string) {
    this.value = value;
    if (this.value === '') {
      this.clearFilter();
      this.setCategory();
    } else {
      this.filterCategory = this.value;
      this.setCategory();
    }
  }

  onEnter(value: string) {
    this.filterCategory = value;
  }

  searchButton() {
    if (this.value) {
      this.filterCategory = this.value;
    } else {
      this.clearFilter();
    }
  }

  sizePage(event: any) {
    this.sizePageTable = parseInt(event.target.value);
    this.numberPages = Math.ceil(this.category.length / this.sizePageTable);

    this.startPage = 0;
    this.endPage = this.sizePageTable;
  }

  prevPage() {
    this.endPage = this.startPage;
    this.startPage = this.startPage - this.sizePageTable;
    this.page--;
  }

  nextPage() {
    this.startPage = this.endPage;
    this.endPage = this.endPage + this.sizePageTable;
    this.page++;
  }

  selectReport(category: Category) {
    this.categorySelected = category;
  }

  show(mostrar: boolean) {
    if (!mostrar) {
      this.mostrar = true;
    } else {
      this.mostrar = false;
    }
  }
}
