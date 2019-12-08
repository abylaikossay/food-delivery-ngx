import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {User} from '../../../@core/models/user';

@Component({
  selector: 'ngx-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  user: User;
  totalPrice: number;

  constructor(private router: Router,
              private toastrService: NbToastrService,
  ) {
    if (!this.router.getCurrentNavigation()) {
      this.toastrService.danger('You refreshed the page!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    this.totalPrice = this.router.getCurrentNavigation().extras.state.totalPrice;
    this.user = this.router.getCurrentNavigation().extras.state.user;
  }

  ngOnInit() {
  }

  goToShop() {
    this.router.navigate(['/shop']).then(() => {
      window.location.reload();
    });
  }
}
