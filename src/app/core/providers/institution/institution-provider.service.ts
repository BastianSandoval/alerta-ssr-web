import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Institution } from './../../../core/models/institution.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionProviderService {

  constructor(private http: HttpService) { }

  getAllInstitutions(): Observable<Institution[]>{
    return this.http.get<Institution[]>('/institution/all');
  }

  getInstitution(id: string): Observable<Institution>{
    return this.http.get<Institution>(`/institution/${id}`);
  }

  getInfoInstitution(id: string): Observable<Institution>{
    return this.http.get<Institution>(`/institution/info/${id}`);
  }

  addInstitution(institution: Institution): Observable<Institution>{
    return this.http.post<Institution>('/institution', institution);
  }

  updateInstitution(id: string, institution: Institution): Observable<Institution>{
     return this.http.patch<Institution>(`/institution/${id}`, institution);
  }

  deleteInstitution(id: string): Observable<Institution>{
    return this.http.delete<Institution>(`/institution/${id}`);
  }

  // getInstitutionsPerCategory(id:string, limit?:number, page?:number): Observable<Institution[]>{
  //   return this.http.get<Institution[]>(`/complaint/category/${id}?page=${page}&limit=${limit}`);
  // }

}
