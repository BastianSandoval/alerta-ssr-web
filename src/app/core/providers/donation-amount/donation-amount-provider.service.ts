import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { DonationAmount } from './../../../core/models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationAmountProviderService {

  constructor(private http: HttpService) { }

  getAllDonationAmounts(): Observable<DonationAmount[]>{
    return this.http.get<DonationAmount[]>('/donation-amount/all');
  }

  getDonationAmount(id: string): Observable<DonationAmount>{
    return this.http.get<DonationAmount>(`/donation-amount/${id}`);
  }

  addDonationAmount(donationAmount: DonationAmount): Observable<DonationAmount>{
    return this.http.post<DonationAmount>('/donation-amount', donationAmount);
  }

  updateDonationAmount(id: string, donationAmount: DonationAmount): Observable<DonationAmount>{
    return this.http.patch<DonationAmount>(`/donation-amount/${id}`, donationAmount);
  }

  deleteDonationAmount(id: string): Observable<DonationAmount>{
    return this.http.delete<DonationAmount>(`/donation-amount/${id}`);
  }
}

