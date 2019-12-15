import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@core/real-services/user.service';
import {User} from '../../../@core/models/user';
import {OrderService} from '../../../@core/real-services/order.service';
import {Order} from '../../../@core/models/order';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  Orders: Order[] = [];

  constructor(private userService: UserService,
              private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo() {
    this.userService.getCurrentUser().subscribe( data => {
      console.log(data);
      this.user = data.data;
      this.orderService.getUserOrders(this.user.id).subscribe( perf => {
        console.log(perf);
        this.Orders = perf;
      });
    });
  }
}
