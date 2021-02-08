import { Pipe, PipeTransform } from '@angular/core';
import { Dog } from '../../../core/models/dog.model';

@Pipe({
  name: 'breedFilter'
})
export class BreedFilterPipe implements PipeTransform {

  transform(list: Dog[], value: string): any{
    return value ? list.filter(item => item.breed.toLocaleLowerCase() === value.toLocaleLowerCase()) : list;
  }

}
