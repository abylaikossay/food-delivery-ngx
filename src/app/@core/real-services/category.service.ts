import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem(environment.apiToken),
  });
  fullUrl = environment.apiUrl + '/api/categories';

  constructor(private http: HttpClient) {
  }
  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.fullUrl, {
      // headers: this.headers,
    });
  }
  public getCategoryById (id): Observable<Category> {
    return this.http.get<Category>(this.fullUrl + `/${id}`, {
      // headers: this.headers,
    });
  }
  public save (category: Category) {
    return this.http.post<Category>(this.fullUrl, category, {
      // headers: this.headers,
    });
  }
}

