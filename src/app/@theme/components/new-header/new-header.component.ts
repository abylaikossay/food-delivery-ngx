import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.scss'],
})
export class NewHeaderComponent implements OnInit {
  isNavbarCollapsed = true;
  constructor(private router: Router,
  ) {
  }

  ngOnInit() {
    // this.activeBtn();
  }
  // activeBtn () {
  //   const infoBtn = document.getElementById('infoBtn');
  //   const shopBtn = document.getElementById('shopBtn');
  //   const profileBtn = document.getElementById('profileBtn');
  //   if (this.router.url === '/info') {
  //     infoBtn.classList.add('active');
  //     shopBtn.classList.remove('active');
  //     profileBtn.classList.remove('active');
  //
  //   } else if (this.router.url === '/shop') {
  //     shopBtn.classList.add('active');
  //     infoBtn.classList.remove('active');
  //     profileBtn.classList.remove('active');
  //
  //   } else if (this.router.url === '/profile') {
  //     profileBtn.classList.add('active');
  //     infoBtn.classList.remove('active');
  //     shopBtn.classList.remove('active');
  //   }
  // }

  navigateHome() {
    this.router.navigate(['info']);
    return false;
  }
}
