import {Component, OnInit, TemplateRef} from '@angular/core';
import {MealService} from '../../../@core/real-services/meal.service';
import {NbDialogService} from '@nebular/theme';
import {Meal} from '../../../@core/models/meal';
import {Router} from '@angular/router';
import {CategoryService} from '../../../@core/real-services/category.service';
import {Category} from '../../../@core/models/category';
import {SendMealService} from '../../../@core/real-services/send-meal.service';
import {Subscription} from 'rxjs';
import {CartDialogComponent} from '../cart-dialog/cart-dialog.component';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  meals: Meal[] = [];
  categories: Category[] = [];
  totalPrice: number;
  noMeals: boolean = false;
  categoryName: string = 'All Categories';
  subscription: Subscription;
  productsAddedToCart: boolean = false;
  addedProducts: Meal[] = [];
  constructor(private mealService: MealService,
              private categoryService: CategoryService,
              private dialogService: NbDialogService,
              private router: Router,
              private sendMealService: SendMealService,
  ) {
  }

  ngOnInit() {
    this.fetchAll();
    this.sendMealService.getCartShow().subscribe( data => {
      this.productsAddedToCart = data.productsAdded;
    });
    this.subscription = this.sendMealService.mealSumAndSums.subscribe(value => {
      this.addedProducts = value.meals;
      this.totalPrice = value.sum;
    });
  }
  fetchAll() {
    this.mealService.getAll().subscribe(perf => {
      this.meals = perf;
    });
    this.categoryService.getAll().subscribe(perf => {
      this.categories = perf;
    });
  }
  changeCategory(id) {
    this.mealService.getMealByCategory(id).subscribe(perf => {
      this.categoryService.getCategoryById(id).subscribe(resp => {
        console.log(resp);
        this.categoryName = resp.name;
      });
      console.log(perf);
      this.noMeals = perf.length === 0;
      this.meals = perf;
    });
  }
  goToCart(meal, totalPrice) {
    this.dialogService.open(CartDialogComponent, {
      context: {
        meals: meal,
        totalPrice: totalPrice,
      },
    });
  }


}
