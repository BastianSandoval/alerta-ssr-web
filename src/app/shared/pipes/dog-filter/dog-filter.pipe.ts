import { Pipe, PipeTransform } from '@angular/core';
import { Dog } from '../../../core/models/dog.model';

@Pipe({
  name: 'dogFilter'
})
export class DogFilterPipe implements PipeTransform {

  transform(list: Dog[], value: string): any{
    return value ? list.filter(item => item.nameDog.toLocaleLowerCase() === value.toLocaleLowerCase()) : list;
  }

}
