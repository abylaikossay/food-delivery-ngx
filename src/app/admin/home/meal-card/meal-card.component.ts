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
  amount: number = 1;
  @Input() meal: Meal;

  constructor(private sendMealService: SendMealService,
              private toastrService: NbToastrService,
  ) {
  }

  ngOnInit() {
  }

  addToCart(meal, amount) {
    this.productNotAdded = false;
    this.productAdded = true;
    this.sendMealService.sendCartShow(true);
    this.sendMealService.sendMeal(meal);
    // this.sendMealService.pushMeal(meal);
    this.sendMealService.sendMealAmount(amount);
    this.toastrService.success('Product successfully added to cart!');
  }

  increaseAmount(amount) {
    this.amount += 1;
    this.sendMealService.sendMealAmount(amount + 1);
  }

  decreaseAmount(amount) {
    if (this.amount > 1) {
      this.amount -= 1;
      this.sendMealService.sendMealAmount(amount - 1);
    } else if (this.amount === 1) {
      this.productNotAdded = true;
      this.productAdded = false;
      this.sendMealService.clearData();
      this.sendMealService.sendCartShow(false);
      this.toastrService.warning('Product has been removed from cart!');
    }
  }
}
