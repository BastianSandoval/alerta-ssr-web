import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Address } from './../../../core/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressProviderService {

  constructor(private http: HttpService) { }

  getAllAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>('/address/all');
  }

  getAddress(id: string): Observable<Address>{
    return this.http.get<Address>(`/address/${id}`);
  }

  addAddress(address: Address): Observable<Address>{
    return this.http.post<Address>('/address', address);
  }

  updateAddress(id: string, address: Address): Observable<Address>{
    return this.http.patch<Address>(`/address/${id}`, address);
  }

  deleteAddress(id: string): Observable<Address>{
    return this.http.delete<Address>(`/address/${id}`);
  }
}
