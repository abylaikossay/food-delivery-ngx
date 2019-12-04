import {Component, Input, OnInit} from '@angular/core';
import {Meal} from '../../../@core/models/meal';
import {SendMealService} from '../../../@core/real-services/send-meal.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {Subscription} from 'rxjs';
import {SendUserService} from '../../../@core/real-services/send-user.service';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'ngx-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent implements OnInit {
  // addedMeals: Meal[] = [];
  subscription: Subscription;
  @Input() meal: Meal;
  constructor(private sendMealService: SendMealService,
              private toastrService: NbToastrService,
              private sendUserService: SendUserService,
              private dialogService: NbDialogService,
  ) {
  }

  ngOnInit() {
    this.meal.quantity = 1;
  }

  addToCart(meal) {
    if (!localStorage.getItem(environment.apiToken)) {
      this.toastrService.danger('Please authorize');
    } else {
      this.meal.isAddedToCart = true;
      this.sendMealService.sendCartShow(true);
      this.sendMealService.pushMeal(meal);
      this.toastrService.success('Product successfully added to cart!');
    }
  }

  increaseAmount() {
    this.meal.quantity ++;
    this.sendMealService.changeMealQuantity(this.meal);
  }

  decreaseAmount() {
    if (this.meal.quantity > 1) {
      this.meal.quantity -= 1;
      this.sendMealService.changeMealQuantity(this.meal);
    } else if (this.meal.quantity === 1) {
      this.sendMealService.changeMealQuantity(this.meal, true);
      this.meal.isAddedToCart = false;
      this.toastrService.warning('Product has been removed from cart!');
    }
  }
}
