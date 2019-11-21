import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantComponent} from './restaurant.component';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule { }
