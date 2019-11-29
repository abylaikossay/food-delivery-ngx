import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../@core/real-services/category.service';
import {MealService} from '../../../@core/real-services/meal.service';
import {Category} from '../../../@core/models/category';
import {Meal} from '../../../@core/models/meal';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  categories: Category[] = [];
  meals: Meal[] = [];

  constructor(private categoryService: CategoryService,
              private mealService: MealService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe( data => {
      this.categories = data;
    });
    this.fetchAll();
  }
  fetchAll() {
    this.mealService.getAll().subscribe( data => {
      this.meals = data;
    });
  }
  getMealByCategory(id) {
    this.mealService.getMealByCategory(id).subscribe( data => {
      this.meals = data;
    });
  }
  goToMeal(id) {
    console.log(id);
    this.router.navigate(['/shop/' + id]);
  }

}
