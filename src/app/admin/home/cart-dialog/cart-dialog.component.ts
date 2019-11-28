import {Component, Inject, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {Meal} from '../../../@core/models/meal';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SendMealService} from '../../../@core/real-services/send-meal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent implements OnInit {
  meals: Meal[] = [];
  totalPrice: number;
  checkoutForm: FormGroup;
  noProducts: boolean = false;
  totalPriceWithShip: number;
  constructor(public dialogRef: MatDialogRef<CartDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private sendMealService: SendMealService,
              private toastrService: NbToastrService,
              private builder: FormBuilder,
  ) {
  }
  emptyCart() {
    if (this.totalPriceWithShip <= 20) {
      this.noProducts = true;
      console.log('cart empty');
    }
  }
  ngOnInit() {
    this.meals = this.data.meals;
    this.totalPrice = this.data.totalPrice;
    this.totalPriceWithShip = this.totalPrice + 20;
    this.emptyCart();
    this.checkoutForm = this.builder.group( {
      address: ['', Validators.required],
    });
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
      this.sendMealService.changeMealQuantity(meal, true, true);
      this.toastrService.warning('Product has been removed from cart!');
      this.emptyCart();
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
    meal.quantity = 1;
    this.sendMealService.changeMealQuantity(meal, true, true);
    this.toastrService.warning('Product has been removed from cart!');
    this.emptyCart();
  }
  productChecout(data, totalprice) {
    const address = this.checkoutForm.get('address').value;
    console.log(address);
    console.log(data);
    console.log(totalprice);
  }
}
