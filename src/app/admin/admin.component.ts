import {Component, OnInit} from '@angular/core';

import { MENU_ITEMS } from './admin-menu';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['admin.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AdminComponent implements  OnInit {
  constructor(private router: Router,
              ) {
  }
  menu = MENU_ITEMS;
  ngOnInit(): void {
      if (localStorage.getItem(environment.roleName) !== 'ROLE_ADMIN') {
        console.log('Зашел Не Админ');
        this.router.navigate(['smart-module']);
      }
    }
}
