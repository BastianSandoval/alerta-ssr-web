import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../../core/models/report.model';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(list: any, value: string): any{
    return value ? list.filter(item => item.category.name.toLocaleLowerCase() === value.toLocaleLowerCase()) : list;
  }

}
