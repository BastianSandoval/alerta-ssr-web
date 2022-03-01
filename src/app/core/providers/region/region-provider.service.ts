import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Region } from './../../../core/models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionProviderService {

  constructor(private http: HttpService) { }

  getAllRegions(): Observable<Region[]>{
    return this.http.get<Region[]>('/region/all');
  }

  getRegion(id: string): Observable<Region>{
    return this.http.get<Region>(`/region/${id}`);
  }

  addRegion(region: Region): Observable<Region>{
    return this.http.post<Region>('/region', region);
  }

  updateRegion(id: string, region: Region): Observable<Region>{
    return this.http.patch<Region>(`/region/${id}`, region);
  }

  deleteRegion(id: string): Observable<Region>{
    return this.http.delete<Region>(`/region/${id}`);
  }
}
