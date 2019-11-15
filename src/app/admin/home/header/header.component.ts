import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/home') {
      const homeBtn = document.getElementById('homeBtn');
      homeBtn.classList.add('mat-raised-button');
    } else if (this.router.url === '/home/about') {
      const aboutBtn = document.getElementById('aboutBtn');
      aboutBtn.classList.add('mat-raised-button');
    } else if (this.router.url === '/home/review') {
      const reviewBtn = document.getElementById('reviewBtn');
      reviewBtn.classList.add('mat-raised-button');

    }
  }

}
