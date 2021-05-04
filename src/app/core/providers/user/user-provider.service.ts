import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { User } from './../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  constructor(private http: HttpService) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>('/user/all');
  }

  getUser(id: string): Observable<User>{
    return this.http.get<User>(`/user/${id}`);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>('/user', user);
  }

  updateUser(id: string, user: User): Observable<User>{
    return this.http.patch<User>(`/user/${id}`, user);
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(`/user/${id}`);
  }
}
