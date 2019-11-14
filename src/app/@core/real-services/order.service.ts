import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  fullUrl = environment.apiUrl + '/api/orders';

  constructor(private http: HttpClient) {
  }
  public getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.fullUrl);
  }
  public getOrderById (id): Observable<Order> {
    return this.http.get<Order>(this.fullUrl + `/${id}`);
  }
  public save (order: Order) {
    return this.http.post<Order>(this.fullUrl , order);
  }
  public deleteOrderbyId (id: number) {
    return this.http.delete(this.fullUrl + `/${id}`).toPromise();
  }
}

