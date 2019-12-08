import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@core/real-services/user.service';
import {User} from '../../../@core/models/user';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe( data => {
      console.log(data);
      this.user = data.data;
    });
  }

}
