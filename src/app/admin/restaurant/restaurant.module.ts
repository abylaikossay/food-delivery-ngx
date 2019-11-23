import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant.component';
import {RouterModule} from '@angular/router';
import { MainComponent } from './main/main.component';
import {NbButtonModule, NbCardModule, NbIconModule} from '@nebular/theme';
import {MatButtonModule} from '@angular/material/button';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule, WavesModule} from 'angular-bootstrap-md';


@NgModule({
  declarations: [RestaurantComponent, MainComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    CarouselModule,
    WavesModule,
    NbIconModule,
    RouterModule,
    NbCardModule,
    MatButtonModule,
    NgbCarouselModule,
    NbButtonModule,
  ],
})
export class RestaurantModule { }
