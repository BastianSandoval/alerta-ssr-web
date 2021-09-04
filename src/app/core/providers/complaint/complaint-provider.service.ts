import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http/http.service';
import { Complaint } from '../../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintProviderService {

  constructor(private http: HttpService) { }

  getAllInstitutions(page?:number, limite?: number): Observable<Complaint[]>{
    return this.http.get<Complaint[]>(`/complaint/all?page=${page}&limit=${limite}`);
  }

  getInstitution(id: string): Observable<Complaint>{
    return this.http.get<Complaint>(`/complaint/${id}`);
  }

  addInstitution(institution: Complaint): Observable<Complaint>{
    return this.http.post<Complaint>('/complaint', institution);
  }

  updateInstitution(id: string, institution: Complaint): Observable<Complaint>{
     return this.http.patch<Complaint>(`/complaint/${id}`, institution);
  }

  deleteInstitution(id: string): Observable<Complaint>{
    return this.http.delete<Complaint>(`/complaint/${id}`);
  }
}
