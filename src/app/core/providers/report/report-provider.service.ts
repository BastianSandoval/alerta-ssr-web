import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Report } from './../../../core/models/report.model';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class ReportProviderService {
  // &with_review=${withReview}&rejected${rejected}
  constructor(private http: HttpService) { }

  getAllReports(page?:number, limite?: number, withReview?: boolean, rejected?:boolean): Observable<Report[]>{
    let url: string = `/complaint/all?page=${page}&limit=${limite}`;
    if (withReview != null) {
      if (rejected != null) {
        url += `&with_review=${withReview}&rejected=${rejected}`;
      } else {
        url += `&with_review=${withReview}`;
      }
    }
    return this.http.get<Report[]>(url);
  }

  getAllInstitutionReports(id: string, page?: number ,limit?:number, withReview?: boolean, rejected?:boolean): Observable<Report[]>{
    let url: string = `/complaint/${id}/all?page=${page}&limit=${limit}`;
    if (withReview != null) {
      if (rejected != null) {
        url += `&with_review=${withReview}&rejected=${rejected}`;
      } else {
        url += `&with_review=${withReview}`;
      }
    }
    return this.http.get<Report[]>(url);
  }

  getComplaintsPerCategory(id:string, limit?:number, page?:number, withReview?: boolean, rejected?:boolean): Observable<Report[]>{
    let url: string = `/complaint/category/${id}?page=${page}&limit=${limit}`;
    if (withReview != null) {
      if (rejected != null) {
        url += `&with_review=${withReview}&rejected=${rejected}`;
      } else {
        url += `&with_review=${withReview}`;
      }
    }
    return this.http.get<Report[]>(url);
  }

  getAllInstitutionReportsByCategory(institutionId:string, categoryId?: string, page?:number, limit?:number,  withReview?: boolean, rejected?:boolean): Observable<Report[]>{
    let url: string = `/complaint/${institutionId}/all?page=${page}&limit=${limit}&categoryId=${categoryId}`;
    if (withReview != null) {
      if (rejected != null) {
        url += `&with_review=${withReview}&rejected=${rejected}`;
      } else {
        url += `&with_review=${withReview}`;
      }
    }
    return this.http.get<Report[]>(url);
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
