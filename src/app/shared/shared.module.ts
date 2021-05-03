import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterPipe } from './pipes/report-filter/report-filter.pipe';
import { CategoryFilterPipe } from './pipes/category-filter/category-filter.pipe';
import { DonationFilterPipe } from './pipes/donation-filter/donation-filter.pipe';


@NgModule({
  declarations: [ReportFilterPipe, CategoryFilterPipe, DonationFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ReportFilterPipe,
    CategoryFilterPipe,
    DonationFilterPipe
  ]
})
export class SharedModule { }
