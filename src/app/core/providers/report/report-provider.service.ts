import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Report } from './../../../core/models/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportProviderService {

  constructor(private http: HttpService) { }

  getAllReports(): Observable<Report[]>{
    return this.http.get<Report[]>('/complaint/all');
  }

  getReport(id: string): Observable<Report>{
    return this.http.get<Report>(`/complaint/${id}`);
  }

  addReport(report: Report): Observable<Report>{
    return this.http.post<Report>('/complaint', report);
  }

  updateReport(id: string, report: Report): Observable<Report>{
    return this.http.patch<Report>(`/complaint/${id}`, report);
  }

  deleteReport(id: string): Observable<Report>{
    return this.http.delete<Report>(`/complaint/${id}`);
  }
}
