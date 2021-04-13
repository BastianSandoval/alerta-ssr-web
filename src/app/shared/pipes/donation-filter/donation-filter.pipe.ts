import { Pipe, PipeTransform } from '@angular/core';
import { Donation } from '../../../core/models/donation.model';

@Pipe({
  name: 'donationFilter'
})
export class DonationFilterPipe implements PipeTransform {

  transform(list: Donation[], value: string): any{
    return value ? list.filter(item => item.donation === parseInt(value)) : list;
  }

}
