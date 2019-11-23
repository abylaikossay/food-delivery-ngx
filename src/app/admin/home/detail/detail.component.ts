import { Component, OnInit } from '@angular/core';
import {Meal} from '../../../@core/models/meal';
import {ActivatedRoute, Router} from '@angular/router';
import {MealService} from '../../../@core/real-services/meal.service';
import {NbToastrService} from '@nebular/theme';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  meal: unknown;
  mealId: number;
  noMeal: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private router: Router,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      mergeMap( res => {
        console.log(res);
        this.mealId = +res['id'];
        return this.mealService.getMealById(this.mealId);
      }),
      mergeMap(resp => {
        this.meal = resp;
        return this.mealService.getMealById(this.mealId);
      }),
    ).subscribe( res => {
      console.log( res);
    }, err => {
      console.log(err);
      this.noMeal = true;
      this.toastrService.danger('Error getting data');
    });
  }

}
