import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Location } from './../../../core/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationProviderService {

  constructor(private http: HttpService) { }

  getAllLocations(): Observable<Location[]>{
    return this.http.get<Location[]>('/location/all');
  }

  getLocation(id: string): Observable<Location>{
    return this.http.get<Location>(`/location/${id}`);
  }

  addLocation(location: Location): Observable<Location>{
    return this.http.post<Location>('/location', location);
  }

  updateLocation(id: string, location: Location): Observable<Location>{
    return this.http.patch<Location>(`/location/${id}`, location);
  }

  deleteLocation(id: string): Observable<Location>{
    return this.http.delete<Location>(`/location/${id}`);
  }
}
