import { APP_ID, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarService } from '../car/car.service';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public API: string = '//thawing-chamber-47973.herokuapp.com';
  public OWNER_API: string = this.API + "/owners" 
  constructor(private http: HttpClient, private carService: CarService) { }

  getAll(): Observable<any> {
    return this.http.get(this.OWNER_API);
  }

  get(dni: string) {
    const route = this.OWNER_API + '/search/findByDni/?dni=' + dni;
    return this.http.get(route);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    console.log(`${owner} will be added`)
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNER_API, owner);
    }
    return result;
  }

  remove(href) {
    console.log(`${href} will be removed`)
    return this.http.delete(href);
  }
}
