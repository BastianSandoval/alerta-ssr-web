import { Pipe, PipeTransform } from '@angular/core';
import { Dog } from '../../../core/models/dog.model';

@Pipe({
  name: 'breedRepeat'
})
export class BreedRepeatPipe implements PipeTransform {

  transform(dogs: Dog[], ...args: unknown[]): Dog[] {
    const notRepeat: Dog[] = [];

    dogs.forEach((value: Dog) => {
      if (notRepeat.find((dog) => dog.breed === value.breed) === undefined) {
        notRepeat.push(value);
      }
    });
    return notRepeat;
  }

}
