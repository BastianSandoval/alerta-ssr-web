import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from './../../../core/models/report.model';
import { HttpService } from './../../services/http/http.service';
import { Tender } from '@core/models/tender.model';

@Injectable({
  providedIn: 'root'
})
export class TenderProviderService {
  path: string = '/tender'
  constructor(private http: HttpService) { }

  getAllTenders(page?: number, limit?: number): Observable<any> {
    let url: string = `${this.path}/all`;
    return this.http.get(url);
  }

  getTendersForTable(page?: number, limit?: number, field?: string, search?: string): Observable<any> {
    let url: string = `${this.path}/table?page=${page}&limit=${limit}&field=${field}&search=${search}`;
    return this.http.get(url);
  }

  getTender(id: string): Observable<Tender> {
    return this.http.get<Tender>(`${this.path}/${id}`);
  }

  addTender(tender: Tender): Observable<Tender> {
    const tenderForm = this.getFormData(tender);
    return this.http.post<Tender>('${this.path}', tenderForm);
  }

  updateTender(id: string, tender: Tender): Observable<Tender> {
    const tenderForm = this.getFormData(tender);

    return this.http.patch<Tender>(`${this.path}/${id}`, tenderForm);
  }

  deleteTender(id: string): Observable<Tender> {
    return this.http.delete<Tender>(`${this.path}/${id}`);
  }


  private getFormData(tender: Tender): FormData {
    const tenderForm = new FormData();

    return tenderForm;
  }
}
