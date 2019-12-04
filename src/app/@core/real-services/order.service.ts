import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem(environment.apiToken),
  });
  fullUrl = environment.apiUrl + '/api/orders';

  constructor(private http: HttpClient) {
  }
  public getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.fullUrl);
  }
  public getOrderById (id): Observable<Order> {
    return this.http.get<Order>(this.fullUrl + `/${id}`);
  }
  public save (order: any) {
    return this.http.post<any>(this.fullUrl , order, {
      headers: this.headers,
    });
  }
  public deleteOrderbyId (id: number) {
    return this.http.delete(this.fullUrl + `/${id}`).toPromise();
  }
}

