import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [CheckoutComponent, MainComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
  ],
})
export class CheckoutModule { }
