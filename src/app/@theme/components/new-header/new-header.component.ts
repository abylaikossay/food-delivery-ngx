import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {SendUserService} from '../../../@core/real-services/send-user.service';
import {User} from '../../../@core/data/users';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.scss'],
})
export class NewHeaderComponent implements OnInit {
  authorized: boolean = false;
  unauthorized: boolean = true;
  userName: string = 'Profile';
  subscription: Subscription;
  user: User;
  constructor(private router: Router,
              private sendUserService: SendUserService,
              private eRef: ElementRef,
  ) {
  }

  ngOnInit() {
    this.subscription = this.sendUserService.getUserInfo().subscribe( perf => {
      this.user = perf.user;
      if (perf.user === '') {
        this.authorized = false;
        this.unauthorized = true;
      } else {
      console.log(this.user);
      this.userName = perf.user.sub;
      this.authorized = true;
      this.unauthorized = false;
      }
    });
    if (localStorage.getItem(environment.apiToken)) {
      this.authorized = true;
      this.unauthorized = false;
      this.userName = localStorage.getItem(environment.userName);
    } else {
      this.authorized = false;
      this.unauthorized = true;
      this.userName = '';
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event) {
      const collapsedDiv = document.getElementById('ftco-nav');
      if (collapsedDiv.classList.contains('show')) {
        if (this.eRef.nativeElement.contains(event.target)) {
        } else {
          collapsedDiv.classList.remove('show');
        }
      }

  }


  navigateHome() {
    this.router.navigate(['info']);
    return false;
  }
}
