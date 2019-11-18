import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils';
import {AuthService} from './@core/real-services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    // if (!localStorage.getItem('apiToken')) {
    //   this.router.navigate(['auth/login']);
    // } else {
    //   console.log('You are authorised');
    // }
  }
}
