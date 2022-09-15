import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Institution } from './../../../core/models/institution.model';
import { Validator } from '@core/models/validator.model';


@Injectable({
  providedIn: 'root'
})
export class InstitutionProviderService {

  constructor(private http: HttpService) { }

  getAllInstitutions(): Observable<Institution[]>{
    return this.http.get<Institution[]>('/institution/all');
  }

  getAllInstitutionValidators(id:string): Observable<Validator[]>{
    return this.http.get<Validator[]>(`/institution/validators/${id}`);
  }

  getAllInstitutionValidatorsPaginate(id:string,page?:number,limit?:number): Observable<Validator[]>{
    return this.http.get<Validator[]>(`/institution/validators/${id}?page=${page}&limit=${limit}`);
  }

  getInstitution(id: string): Observable<Institution>{
    return this.http.get<Institution>(`/institution/${id}`);
  }

  getInfoInstitution(id: string): Observable<Institution>{
    return this.http.get<Institution>(`/institution/info/${id}`);
  }

  addInstitution(institution: any): Observable<any>{
    return this.http.post<any>('/auth/institution/signin', institution);
  }

  addProfilePicture(id: string, images: any, institution: Institution): Observable<Institution> {

    if (institution.profilePictureUrl) {
      /* return this.http.post<Institution>(`/institution'/${id}/profile-picture`) */
    } else {
      /* const imgInstitution = new FormData();
      imgInstitution.append('image', images.profilePictureUrl)
      return this.http.post<Institution>(`/institution'/${id}/profile-picture`, imgInstitution) */
    }
    const imgInstitution = new FormData();
    imgInstitution.append('image', images.profilePictureUrl)
    return this.http.post<Institution>(`/institution/${id}/profile-picture`, imgInstitution)
  }

  updateInstitution(id: string, institution: Institution): Observable<Institution>{
     return this.http.patch<Institution>(`/institution/${id}`, institution);
  }

  verificatePassword(id: string, password: any): Observable<Institution> {
    return this.http.post<Institution>(`/institution/${id}/verificate-password`,password)
  }

  changePassword(id: string, newPassword: any): Observable<Institution> {
    return this.http.patch<Institution>(`/institution/${id}/change-password`, newPassword)
  }

  deleteInstitution(id: string): Observable<Institution>{
    return this.http.delete<Institution>(`/institution/${id}`);
  }

  // getInstitutionsPerCategory(id:string, limit?:number, page?:number): Observable<Institution[]>{
  //   return this.http.get<Institution[]>(`/complaint/category/${id}?page=${page}&limit=${limit}`);
  // }

}
