import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../../core/models/report.model';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(list: Report[], value: string): any{
    return value ? list.filter(item => item.category.toLocaleLowerCase() === value.toLocaleLowerCase()) : list;
  }

}
