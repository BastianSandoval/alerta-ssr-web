import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

interface HttpOptions {
  headers: HttpHeaders
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpOptions: HttpOptions;
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  public get<type>(path: string){
    return this.httpClient.get<type>(this.baseUrl + path, this.httpOptions)
      .pipe( map((data: any) => {
        return data.message as type;
      }));
  }

  public post<type>(path: string, body: any){
    return this.httpClient.post<type>(this.baseUrl + path, body, this.httpOptions)
      .pipe( map((data: any) => {
        return data.message as type;
      }))
  }

  public patch<type>(path: string, body: any) {
    return this.httpClient.patch<type>(this.baseUrl + path, body, this.httpOptions)
      .pipe( map((data: any) => {
        return data.message as type;
      }))
  }

  public delete<type>(path: string){
    return this.httpClient.delete<type>(this.baseUrl + path, this.httpOptions)
      .pipe( map((data: any) => {
        return data.message as type;
      }));
  }
}