import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Commune } from './../../../core/models/commune.model';

@Injectable({
  providedIn: 'root'
})
export class CommuneProviderService {

  constructor(private http: HttpService) { }

  getAllCommunes(): Observable<Commune[]>{
    return this.http.get<Commune[]>('/commune/all');
  }

  getCommune(id: string): Observable<Commune>{
    return this.http.get<Commune>(`/commune/${id}`);
  }

  addCommune(commune: Commune): Observable<Commune>{
    return this.http.post<Commune>('/commune', commune);
  }

  updateCommune(id: string, commune: Commune): Observable<Commune>{
    return this.http.patch<Commune>(`/commune/${id}`, commune);
  }

  deleteCommune(id: string): Observable<Commune>{
    return this.http.delete<Commune>(`/commune/${id}`);
  }
}
