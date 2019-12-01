import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Meal} from '../models/meal';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem(environment.apiToken),
  });
  fullUrl = environment.apiUrl + '/api/meals';

  constructor(private http: HttpClient) {
  }
  public getAll(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.fullUrl, {
      // headers: this.headers,
    });
  }
  public getMealById (id): Observable<Meal> {
    return this.http.get<Meal>(this.fullUrl + `/${id}`, {
      // headers: this.headers,
    });
  }
  public save (meal: Meal) {
    return this.http.post<Meal>(this.fullUrl, meal, {
      headers: this.headers,
    });
  }
  public getMealByCategory(id): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.fullUrl + `/category/${id}`, {
      // headers: this.headers,
    });
  }
}

