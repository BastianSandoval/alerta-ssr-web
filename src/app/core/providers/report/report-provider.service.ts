import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Report } from './../../../core/models/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportProviderService {

  constructor(private http: HttpService) { }

  getAllReports(page:number, limite: number): Observable<Report[]>{
    return this.http.get<Report[]>(`/complaint/all?page=${page}&limit=${limite}`);
  }

  getReport(id: string): Observable<Report>{
    return this.http.get<Report>(`/complaint/${id}`);
  }

  addReport(report: Report): Observable<Report>{
    const reportForm = this.getFormData(report);
    return this.http.post<Report>('/complaint', reportForm);
  }

  updateReport(id: string, report: Report, photoChange:boolean): Observable<Report>{
    const reportForm = this.getFormData(report);
    
    if (photoChange) {
      reportForm.append('imgUrl', report.imageUrl);
    }

    return this.http.patch<Report>(`/complaint/${id}`, reportForm);
  }

  deleteReport(id: string): Observable<Report>{
    return this.http.delete<Report>(`/complaint/${id}`);
  }

  getComplaintsPerCategory(id:string, limit?:number, page?:number): Observable<Report[]>{
    return this.http.get<Report[]>(`/complaint/category/${id}?page=${page}&limit=${limit}`);
  }


  private getFormData(report: any): FormData {
    const reportForm = new FormData();
    reportForm.append('title', report.title);
    reportForm.append('location', report.location);
    reportForm.append('category', report.category);
    reportForm.append('description', report.description);
    reportForm.append('user', report.user);
    reportForm.append('image', report.image);

    return reportForm;
  }
}
