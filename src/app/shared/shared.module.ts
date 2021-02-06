import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedRepeatPipe } from './pipes/breed-repeat/breed-repeat.pipe';
import { TableFilterPipe } from './pipes/table-filter/table-filter.pipe';


@NgModule({
  declarations: [BreedRepeatPipe, TableFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    BreedRepeatPipe,
    TableFilterPipe
  ]
})
export class SharedModule { }
