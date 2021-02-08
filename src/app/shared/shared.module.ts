import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedRepeatPipe } from './pipes/breed-repeat/breed-repeat.pipe';
import { TableFilterPipe } from './pipes/table-filter/table-filter.pipe';
import { DogFilterPipe } from './pipes/dog-filter/dog-filter.pipe';


@NgModule({
  declarations: [BreedRepeatPipe, TableFilterPipe, DogFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    BreedRepeatPipe,
    TableFilterPipe,
    DogFilterPipe
  ]
})
export class SharedModule { }
