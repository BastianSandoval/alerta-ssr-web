import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {
  @Input() data: any[];
  @Input() loader: boolean;
  @Input() headers: string[] = [];
  @Input() fields: string[] = [];

  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() hasNext: boolean = false;
  @Input() hasPrev: boolean = false;



  @Output() selectData = new EventEmitter<any>();
  @Output() searchData = new EventEmitter<any>();
  @Output() dataSelected = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() changePage = new EventEmitter<number>();

  empty = '';

  onSelectData(item) {
    this.selectData.emit(item);
  }

  onDataSelected(item) {
    this.dataSelected.emit(item);
  }

  onDeleteItem(event) {
    this.deleteItem.emit(event);
  }


  prevPage() {
    this.currentPage--;
    this.changePage.emit(this.currentPage);
  }

  nextPage() {
    this.currentPage++;
    this.changePage.emit(this.currentPage);
  }

  onValue(value: string) {
    if (value != this.empty) {
      this.empty = value;
      this.searchData.emit(value);
    }
  }

  onEnter(value: string) {

  }
  searchButton() {

  }
  clearFilter() {

  }


}
