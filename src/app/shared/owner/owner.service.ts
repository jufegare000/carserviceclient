import { APP_ID, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public API: string = '//thawing-chamber-47973.herokuapp.com';
  public OWNER_API: string = this.API + "/owners" 
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.OWNER_API);
  }

  get(dni: string) {
    return this.http.get(this.OWNER_API + '/' + dni);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    console.log(`${owner} will be removed`)
    if (owner['dni']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNER_API, owner);
    }
    return result;
  }

  remove(dni: string) {
    console.log(`${dni} will be removed`)
    return this.http.delete(dni);
  }

}
