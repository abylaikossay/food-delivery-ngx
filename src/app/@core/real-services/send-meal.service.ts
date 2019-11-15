import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Pagination} from '../models/pagination/pagination';
import {Meal} from '../models/meal';


@Injectable({
  providedIn: 'root',
})
export class SendMealService {
  private mealSubject = new Subject<any>();
  private cartShowSubject = new Subject<any>();
  private mealAmountSubject = new Subject<any>();


  sendMeal(data: Meal) {
    this.mealSubject.next({
      meal: data,
    });
  }
  sendCartShow(added: boolean) {
    this.cartShowSubject.next( {
      productsAdded: added,
    });
  }
  sendMealAmount(amount: number) {
    this.mealAmountSubject.next( {amount: amount});
  }



  clearData() {
    this.mealSubject.next({
      meal: {},
    });
    this.mealAmountSubject.next({
      amount: 0,
    });
  }





  getCartShow(): Observable<any> {
    return this.cartShowSubject.asObservable();
  }
  getMealAmount(): Observable<any> {
    return this.mealAmountSubject.asObservable();
  }
  getMealData(): Observable<any> {
    return this.mealSubject.asObservable();
  }
  constructor() {
  }
}
