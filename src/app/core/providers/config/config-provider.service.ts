import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Config } from './../../../core/models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigProviderService {

  constructor(private http: HttpService) { }

  getAllConfigs(): Observable<Config[]>{
    return this.http.get<Config[]>('/config/all');
  }

  getConfig(id: string): Observable<Config>{
    return this.http.get<Config>(`/config/${id}`);
  }

  addConfig(config: Config): Observable<Config>{
    return this.http.post<Config>('/config', config);
  }

  updateConfig(id: string, config: Config): Observable<Config>{
    return this.http.patch<Config>(`/config/${id}`, config);
  }

  deleteConfig(id: string): Observable<Config>{
    return this.http.delete<Config>(`/config/${id}`);
  }
}
