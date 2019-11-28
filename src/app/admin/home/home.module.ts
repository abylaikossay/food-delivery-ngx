import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MainComponent} from './main/main.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbInputModule,
  NbListModule,
  NbMenuModule, NbSelectModule,
} from '@nebular/theme';
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
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    DetailComponent,
    HeaderComponent,
    AboutComponent,
    ReviewComponent,
    MealCardComponent,
    CartDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    MatCardModule,
    NbAlertModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    NbListModule,
    MatInputModule,
    MatListModule,
    NbMenuModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    CartDialogComponent,
  ],

})
export class HomeModule {
}
