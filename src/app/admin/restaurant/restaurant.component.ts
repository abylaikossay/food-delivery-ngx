import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-restaurant',
  template: '<router-outlet></router-outlet> ',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
