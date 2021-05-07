import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpService} from './../../services/http/http.service';
import { Comment } from './../../../core/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentProviderService {

  constructor(private http: HttpService) { }

  getAllComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>('/comment/all');
  }

  getComment(id: string): Observable<Comment>{
    return this.http.get<Comment>(`/comment/${id}`);
  }

  addComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>('/comment', comment);
  }

  updateComment(id: string, comment: Comment): Observable<Comment>{
    return this.http.patch<Comment>(`/comment/${id}`, comment);
  }

  deleteComment(id: string): Observable<Comment>{
    return this.http.delete<Comment>(`/comment/${id}`);
  }
}
