import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [AuthorizationComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
