import {Component, OnInit, TemplateRef, OnDestroy} from '@angular/core';
import {MealService} from '../../../@core/real-services/meal.service';
import {NbDialogService} from '@nebular/theme';
import {Meal} from '../../../@core/models/meal';
import {Router} from '@angular/router';
import {CategoryService} from '../../../@core/real-services/category.service';
import {Category} from '../../../@core/models/category';
import {SendMealService} from '../../../@core/real-services/send-meal.service';
import {Subscription} from 'rxjs';
import {CartDialogComponent} from '../cart-dialog/cart-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Browser} from 'leaflet';
import win = Browser.win;
import {main} from '@angular/compiler-cli/src/main';
import {environment} from '../../../../environments/environment';
import {UserService} from '../../../@core/real-services/user.service';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  selectedItem = '1';
  meals: Meal[] = [];
  categories: Category[] = [];
  totalPrice: number;
  noMeals: boolean = false;
  categoryName: string = 'All Categories';
  subscription: Subscription;
  productsAddedToCart: boolean = false;
  addedProducts: Meal[] = [];
  unauthorized: boolean = true;

  constructor(private mealService: MealService,
              private categoryService: CategoryService,
              // private dialogService: NbDialogService,
              private router: Router,
              private sendMealService: SendMealService,
              private matDialog: MatDialog,
              private userService: UserService,
  ) {
  }

  ngOnInit() {
    // console.log(localStorage.getItem(environment.apiToken))
    if (localStorage.getItem(environment.apiToken)) {
      this.unauthorized = false;
    } else {
      this.unauthorized = true;
    }
    // window.addEventListener('scroll', this.scroll, true);
    document.addEventListener('scroll', MainComponent.scroll, true);
    this.fetchAll();
    this.sendMealService.getCartShow().subscribe(data => {
      this.productsAddedToCart = data.productsAdded;
    });
    this.subscription = this.sendMealService.mealSumAndSums.subscribe(value => {
      this.addedProducts = value.meals;
      this.totalPrice = value.sum;
    });
  }
  ngOnDestroy(): void {
    document.removeEventListener('scroll', MainComponent.scroll, true);
  }
  private static scroll() {
    const selectFix = document.getElementById('categories-select');
    const windowY = selectFix.getBoundingClientRect();
    if (selectFix.scrollHeight >= windowY.top) {
      selectFix.classList.add('scrolled');
    }
    const foodList = document.getElementById('food-list');
    // console.log(foodList.getBoundingClientRect());
    const foodListY = foodList.getBoundingClientRect().top;
    if (foodListY >= windowY.bottom) {
      selectFix.classList.remove('scrolled');
    }
  }

  fetchAll() {
    this.categoryName = 'All Categories';
    this.noMeals = false;
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

  goToCart(meal, totalPrice): void {
    this.userService.getCurrentUser().subscribe( data => {
      this.matDialog.open(CartDialogComponent, {
        width: '1000px',
        panelClass: 'cart-dialog-width',
        data: {meals: meal, totalPrice: totalPrice, user: data.data},
      });
    });
    // this.dialogService.open(CartDialogComponent, {
    //   context: {
    //     meals: meal,
    //     totalPrice: totalPrice,
    //   },
    // });

  }


}
