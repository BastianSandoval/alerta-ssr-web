import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterPipe } from './pipes/report-filter/report-filter.pipe';
import { CategoryFilterPipe } from './pipes/category-filter/category-filter.pipe';
import { DonationFilterPipe } from './pipes/donation-filter/donation-filter.pipe';
import { CategoryFilterNamePipe } from './pipes/category-filter-name/category-filter-name.pipe';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { EventFilterPipe } from './pipes/event-filter/event-filter.pipe';
import { CommentFilterPipe } from './pipes/comment-filter/comment-filter.pipe';



@NgModule({
  declarations: [ReportFilterPipe, CategoryFilterPipe, DonationFilterPipe, CategoryFilterNamePipe, CapitalizePipe, LoaderComponent, EventFilterPipe, CommentFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ReportFilterPipe,
    CategoryFilterPipe,
    DonationFilterPipe,
    CategoryFilterNamePipe,
    CapitalizePipe,
    LoaderComponent,
    EventFilterPipe,
    CommentFilterPipe
  ]
})
export class SharedModule { }
