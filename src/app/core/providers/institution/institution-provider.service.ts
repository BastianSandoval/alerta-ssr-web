import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Institution } from './../../../core/models/institution.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionProviderService {

  constructor(private http: HttpService) { }

  getAllInstitutions(page?:number, limite?: number): Observable<Institution[]>{
    return this.http.get<Institution[]>(`/complaint/all?page=${page}&limit=${limite}`);
  }

  getInstitution(id: string): Observable<Institution>{
    return this.http.get<Institution>(`/complaint/${id}`);
  }

  addInstitution(institution: Institution): Observable<Institution>{
    return this.http.post<Institution>('/complaint', institution);
  }

  updateInstitution(id: string, institution: Institution): Observable<Institution>{
     return this.http.patch<Institution>(`/complaint/${id}`, institution);
  }

  deleteInstitution(id: string): Observable<Institution>{
    return this.http.delete<Institution>(`/complaint/${id}`);
  }

  // getInstitutionsPerCategory(id:string, limit?:number, page?:number): Observable<Institution[]>{
  //   return this.http.get<Institution[]>(`/complaint/category/${id}?page=${page}&limit=${limit}`);
  // }

}
