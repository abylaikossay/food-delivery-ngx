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
  }

  navigateHome() {
    this.router.navigate(['info']);
    return false;
  }
}
