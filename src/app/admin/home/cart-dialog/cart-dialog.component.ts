import {Component, Inject, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {Meal} from '../../../@core/models/meal';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SendMealService} from '../../../@core/real-services/send-meal.service';

@Component({
  selector: 'ngx-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent implements OnInit {
  meals: Meal[] = [];
  totalPrice: number;
  totalPriceWithShip: number;
  constructor(public dialogRef: MatDialogRef<CartDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private sendMealService: SendMealService,
              private toastrService: NbToastrService,
  ) {
  }

  ngOnInit() {
    this.meals = this.data.meals;
    this.totalPrice = this.data.totalPrice;
    this.totalPriceWithShip = this.totalPrice + 20;
  }
  decreaseAmount(meal) {
    if (meal.quantity > 1) {
      meal.quantity -= 1;
      this.totalPrice -= meal.price;
      this.sendMealService.changeMealQuantity(meal);
      this.totalPriceWithShip = this.totalPrice + 20;
    } else if (meal.quantity === 1) {
      this.totalPrice -= meal.price;
      this.totalPriceWithShip = this.totalPrice + 20;
      this.sendMealService.changeMealQuantity(meal, true);
      this.toastrService.warning('Product has been removed from cart!');
    }
  }
  increaseAmount(meal) {
    this.totalPrice += meal.price;
    meal.quantity ++;
    this.sendMealService.changeMealQuantity(meal);
    this.totalPriceWithShip = this.totalPrice + 20;
  }
  dismiss() {
    this.dialogRef.close();
  }
  removeMeal(meal) {
    this.totalPrice -= meal.price * meal.quantity;
    this.totalPriceWithShip = this.totalPrice + 20;
    this.sendMealService.changeMealQuantity(meal, true);
    this.toastrService.warning('Product has been removed from cart!');

  }
}
