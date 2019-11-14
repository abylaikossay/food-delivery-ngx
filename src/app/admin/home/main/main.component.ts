import {Component, OnInit, TemplateRef} from '@angular/core';
import {MealService} from '../../../@core/real-services/meal.service';
import {NbDialogService} from '@nebular/theme';
import {Meal} from '../../../@core/models/meal';
import {Router} from '@angular/router';
import {CategoryService} from '../../../@core/real-services/category.service';
import {Category} from '../../../@core/models/category';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  meals: Meal[] = [];
  categories: Category[] = [];
  amount: number = 1;
  productAdded: boolean = false;
  productNotAdded: boolean = true;
  constructor(private mealService: MealService,
              private categoryService: CategoryService,
              private dialogService: NbDialogService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.fetchAll();
  }
  fetchAll() {
    this.mealService.getAll().subscribe(perf => {
      this.meals = perf;
    });
    this.categoryService.getAll().subscribe(perf => {
      this.categories = perf;
    })
  }
  changeCategory(id) {
    console.log('asdasd');
    this.mealService.getMealByCategory(id).subscribe(perf => {
      console.log(perf);
      this.meals = perf;
    })
  }
  addToCart(event, id) {
    this.productNotAdded = false;
    this.productAdded = true;
  }
  increaseAmount() {
    this.amount ++;
  }
  decreaseAmount() {
    if (this.amount >1 ) {
      this.amount --;
    } else if (this.amount === 1 ){
      this.productNotAdded = true;
      this.productAdded = false;
    }
  }

}
