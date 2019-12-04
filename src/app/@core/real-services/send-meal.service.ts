import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Meal} from '../models/meal';


@Injectable({
  providedIn: 'root',
})
export class SendMealService {
  private mealArray = new Array<any>();
  private cartShowSubject = new Subject<any>();
  readonly mealSumAndSums = new Subject<any>();

  pushMeal(data: Meal) {
    this.mealArray.push(data);
    this.mealSumAndSums.next(this.getMealSumAndSums());
  }

  getMealSumAndSums() {
    const mealSumsAndSums = {} as any;
    mealSumsAndSums.sum = this.calculateSum();
    mealSumsAndSums.meals = this.mealArray;
    return mealSumsAndSums;
  }

  calculateSum() {
    let mealSum = 0;
    const mealSums = this.mealArray.map(value => {
      value.totalPrice = value.price * value.quantity;
      return value.totalPrice;
    });
    mealSums.forEach(value => {
      mealSum += value;
    });
    return mealSum;
  }

  changeMealQuantity(data: Meal, isDeleted?: boolean, isRemoved?: boolean) {
    let arrayIndex;
    this.mealArray.forEach((value, index) => {
      if (value.id === data.id) {
        value.quantity = data.quantity;
        arrayIndex = index;
      }
    });
    if (isDeleted) {
      this.mealArray.splice(arrayIndex, 1);
    }
    if (isRemoved) {
      data.isAddedToCart = false;
    }
    if (this.mealArray.length === 0) {
      this.clearData();
    }
    this.mealSumAndSums.next(this.getMealSumAndSums());
  }
  sendCartShow(added: boolean) {
    this.cartShowSubject.next({
      productsAdded: added,
    });
  }
  clearData() {
    this.sendCartShow(false);
  }
  getCartShow(): Observable<any> {
    return this.cartShowSubject.asObservable();
  }

  constructor() {
  }
}
