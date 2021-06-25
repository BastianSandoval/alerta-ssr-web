import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(list: any[], value: string): any{
    return value ? list.filter(item => item.report.title.toLocaleLowerCase() === value.toLocaleLowerCase()) : list;
  }

}
