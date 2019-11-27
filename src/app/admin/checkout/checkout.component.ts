import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-checkout',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
