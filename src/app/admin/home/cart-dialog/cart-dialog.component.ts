import {Component, Inject, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {Meal} from '../../../@core/models/meal';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SendMealService} from '../../../@core/real-services/send-meal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../../@core/models/user';

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
  deliveryPrice: number = 10;
  user: User;
  constructor(public dialogRef: MatDialogRef<CartDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private sendMealService: SendMealService,
              private toastrService: NbToastrService,
              private builder: FormBuilder,
              private router: Router,
  ) {
  }
  emptyCart() {
    if (this.totalPriceWithShip <= this.deliveryPrice) {
      this.noProducts = true;
      console.log('cart empty');
    }
  }
  ngOnInit() {
    this.meals = this.data.meals;
    this.totalPrice = this.data.totalPrice;
    this.user = this.data.user;
    this.totalPriceWithShip = this.totalPrice + this.deliveryPrice;
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
      this.totalPriceWithShip = this.totalPrice + this.deliveryPrice;
    } else if (meal.quantity === 1) {
      this.totalPrice -= meal.price;
      this.totalPriceWithShip = this.totalPrice + this.deliveryPrice;
      this.sendMealService.changeMealQuantity(meal, true, true);
      this.toastrService.warning('Product has been removed from cart!');
      this.emptyCart();
    }
  }
  increaseAmount(meal) {
    this.totalPrice += meal.price;
    meal.quantity ++;
    this.sendMealService.changeMealQuantity(meal);
    this.totalPriceWithShip = this.totalPrice + this.deliveryPrice;
  }
  dismiss() {
    this.dialogRef.close();
  }
  removeMeal(meal) {
    this.totalPrice -= meal.price * meal.quantity;
    this.totalPriceWithShip = this.totalPrice + this.deliveryPrice;
    meal.quantity = 1;
    this.sendMealService.changeMealQuantity(meal, true, true);
    this.toastrService.warning('Product has been removed from cart!');
    this.emptyCart();
  }
  productCheckout(data, totalprice) {
    const address = this.checkoutForm.get('address').value;
    this.dismiss();
    this.router.navigate(['checkout'], {state: {
      data: data,
      address: address,
        user: this.user,
        totalPrice: totalprice,
      }});
  }
}
