import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Meal} from '../../../@core/models/meal';

@Component({
  selector: 'ngx-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent implements OnInit {
  @Input() meals: Meal[];
  @Input() totalPrice: number;

  constructor(protected ref: NbDialogRef<CartDialogComponent>,
  ) {
  }

  ngOnInit() {
    console.log(this.meals);
    console.log(this.totalPrice);
  }

  dismiss() {
    this.ref.close();
  }
}
