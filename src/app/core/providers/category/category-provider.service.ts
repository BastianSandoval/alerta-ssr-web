import { Injectable } from '@angular/core';
import {HttpService} from './../../services/http/http.service';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryProviderService {

  constructor(private http: HttpService) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>('/category/all');
  }

  getInstitutionCategories(institutionId: string): Observable<Category[]>{
    return this.http.get<Category[]>(`/category/${institutionId}/all`);
  }

  getCategory(id: string): Observable<Category>{
    return this.http.get<Category>(`/category/${id}`);
  }

  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>('/category', category);
  }

  updateCategory(id: string, category: Category): Observable<Category>{
    return this.http.patch<Category>(`/category/${id}`, category);
  }

  deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(`/category/${id}`);
  }
}
