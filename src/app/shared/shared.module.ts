import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedRepeatPipe } from './pipes/breed-repeat/breed-repeat.pipe';
import { BreedFilterPipe } from './pipes/breed-filter/breed-filter.pipe';
import { DogFilterPipe } from './pipes/dog-filter/dog-filter.pipe';


@NgModule({
  declarations: [BreedRepeatPipe, BreedFilterPipe, DogFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    BreedRepeatPipe,
    BreedFilterPipe,
    DogFilterPipe
  ]
})
export class SharedModule { }
