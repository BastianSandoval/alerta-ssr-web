import { Pipe, PipeTransform } from '@angular/core';
import { DonationAmount } from '../../../core/models/donation.model';

@Pipe({
  name: 'donationFilter'
})
export class DonationFilterPipe implements PipeTransform {

  transform(list: DonationAmount[], value: string): any{
    return value ? list.filter(item => item.amount === parseInt(value)) : list;
  }

}
