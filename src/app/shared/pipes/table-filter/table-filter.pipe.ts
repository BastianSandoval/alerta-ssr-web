import { Pipe, PipeTransform } from '@angular/core';
import { Dog } from '../../../core/models/dog.model';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: Dog[], value: string): any{
    return value ? list.filter(item => item.breed === value) : list;
  }

}
