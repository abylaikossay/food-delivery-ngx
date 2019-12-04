import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { MainComponent } from './main/main.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbListModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [CheckoutComponent, MainComponent, SuccessComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    NbListModule,
    NbButtonModule,
    NbCardModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
  ],
})
export class CheckoutModule { }
