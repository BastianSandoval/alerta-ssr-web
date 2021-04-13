import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedRepeatPipe } from './pipes/breed-repeat/breed-repeat.pipe';
import { BreedFilterPipe } from './pipes/breed-filter/breed-filter.pipe';
import { ReportFilterPipe } from './pipes/report-filter/report-filter.pipe';
import { CategoryFilterPipe } from './pipes/category-filter/category-filter.pipe';
import { DonationFilterPipe } from './pipes/donation-filter/donation-filter.pipe';


@NgModule({
  declarations: [BreedRepeatPipe, BreedFilterPipe, ReportFilterPipe, CategoryFilterPipe, DonationFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    BreedRepeatPipe,
    BreedFilterPipe,
    ReportFilterPipe,
    CategoryFilterPipe,
    DonationFilterPipe
  ]
})
export class SharedModule { }
