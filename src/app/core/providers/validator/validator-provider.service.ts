import { Injectable } from '@angular/core';
import { Institution } from '@core/models/institution.model';
import { Validator } from '@core/models/validator.model';
import { HttpService } from '@core/services/http/http.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ValidatorProviderService {

  constructor(private http: HttpService) { }

  postCreateValidatorRequest(name: string, lastName: string, email: string, rut: string, institution: Institution): Observable<any> {
    return this.http.post<any>(`/auth/validator/signin`, 
    { 
      "names": name.trim(),
      "lastNames": lastName.trim(),
      "username": name.trim(),
      "phone": institution.phonesNumbers[0],
      "email": email.trim(),
      "rut": rut.trim(),
      "institutionId": institution._id,
      "password": "123456",
      "address": institution.address,
    }
    );
  }

  getValidatorsOfIntitution(id:string,page:number,limit:number): Observable<Validator[]> {
    return this.http.get<Validator[]>(`/institution/validators/${id}?page=${page}&limit=${limit}`);
  }

  deleteValidator(id:string): Observable<Validator> {
    return this.http.delete<Validator>(`/validator/${id}`);
  }
  
  approveValidator(id:string): Observable<Validator> {
    return this.http.patch<Validator>(`/validator/${id}/approve`,'');
  }
}
