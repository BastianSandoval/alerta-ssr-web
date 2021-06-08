import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './../../services/http/http.service';
import { Event } from './../../../core/models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventProviderService {

  constructor(private http: HttpService) { }

  getEvents(page:number, limite: number): Observable<Event[]>{
    return this.http.get<Event[]>(`/event/all?page=${page}&limit=${limite}`);
  }

  getEvent(id: string): Observable<Event>{
    return this.http.get<Event>(`/event/${id}`);
  }

  addEvent(event: Event): Observable<Event>{
    return this.http.post<Event>('/event', event);
  }

  updateEvent(id: string, event: Event): Observable<Event>{
    return this.http.patch<Event>(`/event/${id}`, event);
  }

  deleteEvent(id: string): Observable<Event>{
    return this.http.delete<Event>(`/event/${id}`);
  }
}
