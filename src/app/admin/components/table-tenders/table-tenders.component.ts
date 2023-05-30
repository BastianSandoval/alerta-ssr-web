import { Component, OnInit } from '@angular/core';
import { Paginate } from '@core/models/paginate.model';
import { Tender } from '@core/models/tender.model';
import { TenderProviderService } from '@core/providers/tender/tender-provider.service';

@Component({
  selector: 'app-table-tenders',
  templateUrl: './table-tenders.component.html',
  styleUrls: ['./table-tenders.component.css']
})
export class TableTendersComponent implements OnInit {
  loader: boolean = false; // Inicializa la variable loader
  headers: string[] = ['NOMBRE', 'FECHA DE INICIO', 'FECHA DE TÉRMINO', 'CATEGORÍA', 'PRESUPUESTO', 'UBICACIÓN',];
  fields: string[] = ['title', 'start_date', 'end_date', 'category', 'budget', 'address'];
  tenders: Tender[] = [];
  paginated: Paginate<Tender>;
  page: number = 1;
  limit: number = 5;
  hasPrev: boolean = false;
  hasNext: boolean = false;


  field: string = 'title';
  search: string = '';

  constructor(
    private readonly tenderProvider: TenderProviderService,
  ) { }

  async ngOnInit() {
    this.paginated = await this.tenderProvider.getTendersForTable(this.page, this.limit).toPromise();
    this.hasPrev = this.paginated.hasPrevPage;
    this.hasNext = this.paginated.hasNextPage;
    this.tenders = this.paginated.docs;
    this.loader = true;
  }

  async updateTenders() {
    if (this.search == '') {
      this.paginated = await this.tenderProvider.getTendersForTable(this.page, this.limit).toPromise();
      this.hasPrev = this.paginated.hasPrevPage;
      this.hasNext = this.paginated.hasNextPage;
      this.tenders = this.paginated.docs;
    } else {
      this.paginated = await this.tenderProvider.getTendersForTable(this.page, this.limit, this.field, this.search).toPromise();
      this.hasPrev = this.paginated.hasPrevPage;
      this.hasNext = this.paginated.hasNextPage;
      this.tenders = this.paginated.docs;
    }
  }



  searchTenders(value: any) {
    this.search = value;
    this.page = 1;
    this.updateTenders();
  }


  selectData(item: any) {
    // Lógica cuando se selecciona un elemento de la tabla. 
  }

  dataSelected(item: any) {
    // Lógica cuando se selecciona para eliminar un elemento.
  }

  deleteItem(event: any) {
    // Lógica para eliminar un elemento.
  }

  changePage(page: number) {
    this.page = page;
    this.updateTenders();
  }

}
