import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from './authorization.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule { }
