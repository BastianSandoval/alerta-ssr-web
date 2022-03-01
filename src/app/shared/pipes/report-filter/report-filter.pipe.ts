import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../../../core/models/report.model';

@Pipe({
  name: 'reportFilter'
})
export class ReportFilterPipe implements PipeTransform {

  transform(list: Report[], value: string): any{
    return value ? list.filter(item => item.title.toLocaleLowerCase() === value.toLocaleLowerCase()) : list;
  }

}
