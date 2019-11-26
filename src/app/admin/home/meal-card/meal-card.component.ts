import {Component, Input, OnInit} from '@angular/core';
import {Meal} from '../../../@core/models/meal';
import {SendMealService} from '../../../@core/real-services/send-meal.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent implements OnInit {
  productAdded: boolean = false;
  productNotAdded: boolean = true;
  addedMeals: Meal[] = [];
  // amount: number = 1;
  @Input() meal: Meal;
  constructor(private sendMealService: SendMealService,
              private toastrService: NbToastrService,
  ) {
  }

  ngOnInit() {
  }

  addToCart(meal) {
    this.productNotAdded = false;
    this.productAdded = true;
    this.sendMealService.sendCartShow(true);
    this.sendMealService.pushMeal(meal);
    this.toastrService.success('Product successfully added to cart!');
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
      this.productNotAdded = true;
      this.productAdded = false;
      this.toastrService.warning('Product has been removed from cart!');
    }
  }
}
