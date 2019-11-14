import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MainComponent} from './main/main.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbListModule} from '@nebular/theme';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {HeaderComponent} from './header/header.component';
import {AboutComponent} from './about/about.component';
import {ReviewComponent} from './review/review.component';
import {MatListModule} from '@angular/material/list';
import {MealCardComponent} from './meal-card/meal-card.component';


@NgModule({
  declarations: [HomeComponent, MainComponent, DetailComponent, HeaderComponent, AboutComponent, ReviewComponent, MealCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    MatCardModule,
    NbButtonModule,
    NbInputModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule,
    NbListModule,
    MatInputModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HomeModule {
}
