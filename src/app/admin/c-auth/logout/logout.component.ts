import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../@core/real-services/auth.service';
import {Router} from '@angular/router';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  ngOnInit() {
  }
}
