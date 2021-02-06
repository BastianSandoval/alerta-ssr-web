import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreedProviderService {

  constructor(private httpService: HttpService) { }

  public getBreed(): Promise<any[]> {
    return this.httpService.get<any[]>('/breeds/list/all')
      .pipe(map((data: any) => { 
        let breeds = Object.keys(data);
        return breeds;
      })).toPromise();
  } 

  public getBreedImage(breed: any): Promise<any> {
    return this.httpService.get<any>('/breed/' + breed + '/images/random')

    .toPromise();
  } 

}
