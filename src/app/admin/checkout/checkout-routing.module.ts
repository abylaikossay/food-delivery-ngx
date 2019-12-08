import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {CheckoutComponent} from './checkout.component';
import {SuccessComponent} from './success/success.component';


const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'success',
        component: SuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule { }
