import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilterName'
})
export class CategoryFilterNamePipe implements PipeTransform {

  transform(list: any, value: string): any{
    return value ? list.filter(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase()) : list;
  }

}
