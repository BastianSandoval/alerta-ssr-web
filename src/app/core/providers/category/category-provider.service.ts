import { Injectable } from '@angular/core';
import {HttpService} from './../../services/http/http.service';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoryLink } from '@core/models/category-link.model';

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

  getCategoryLink(categoryId: string): Observable<CategoryLink>{
    return this.http.get<CategoryLink>(`/category/link`,);
  }

  getCategoryLinks(id: string): Observable<CategoryLink[]>{
    return this.http.get<CategoryLink[]>(`/category/link/all`);
  }

  getCategoryLinkByCommune(id: string): Observable<CategoryLink>{
    return this.http.get<CategoryLink>(`/category/link/commune`);
  }

  getCategoryLinkByRegion(id: string): Observable<CategoryLink>{
    return this.http.get<CategoryLink>(`/category/link/region`);
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
