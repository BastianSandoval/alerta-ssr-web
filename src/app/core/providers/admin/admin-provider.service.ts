import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Admin } from './../../../core/models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProviderService {

  constructor(private http: HttpService) { }

  getAllAdmins(): Observable<Admin[]>{
    return this.http.get<Admin[]>('/admin/all');
  }

  getAdmin(id: string): Observable<Admin>{
    return this.http.get<Admin>(`/admin/${id}`);
  }

  addAdmin(admin: Admin): Observable<Admin>{
    return this.http.post<Admin>('/admin', admin);
  }

  updateAdmin(id: string, admin: Admin): Observable<Admin>{
    return this.http.patch<Admin>(`/admin/${id}`, admin);
  }

  deleteAdmin(id: string): Observable<Admin>{
    return this.http.delete<Admin>(`/admin/${id}`);
  }
}
