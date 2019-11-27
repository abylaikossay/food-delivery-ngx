import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckboxComponent} from 'angular-bootstrap-md';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: CheckboxComponent,
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
export class CheckoutRoutingModule { }
