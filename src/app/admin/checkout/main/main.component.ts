import {Component, OnInit} from '@angular/core';
import {SendMealService} from '../../../@core/real-services/send-meal.service';
import {Subscription} from 'rxjs';
import {Meal} from '../../../@core/models/meal';
import {Elements, StripeService, Element as StripeElement, ElementsOptions} from 'ngx-stripe';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {OrderService} from '../../../@core/real-services/order.service';
import {User} from '../../../@core/models/user';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  meals: Meal[];
  subscription: Subscription;
  totalPrice: number;
  totalPriceWithDelivery: number;
  address: string;
  deliveryPrice: number = 10;
  elements: Elements;
  card: StripeElement;
  user: User;
  elementsOptions: ElementsOptions = {
    locale: 'auto',
  };
  stripeTest: FormGroup;
  constructor(private sendMealService: SendMealService,
              private fb: FormBuilder,
              private stripeService: StripeService,
              private toastrService: NbToastrService,
              private router: Router,
              private orderService: OrderService,
  ) {
    if (!this.router.getCurrentNavigation()) {
      this.toastrService.danger('You refreshed the page!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    this.meals = this.router.getCurrentNavigation().extras.state.data;
    this.totalPrice = this.router.getCurrentNavigation().extras.state.totalPrice;
    this.address = this.router.getCurrentNavigation().extras.state.address;
    this.user = this.router.getCurrentNavigation().extras.state.user;
    this.totalPriceWithDelivery = this.totalPrice + this.deliveryPrice;
  }
  widthFunction(y) {
    if (y.matches) {
      document.getElementById('section-container').classList.add('container-lg');
    }
  }
  ngOnInit() {
    console.log(this.user);
    const y = window.matchMedia('(min-width: 500px)');
    this.widthFunction(y);
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0',
                },
              },
            },
          });
          this.card.mount('#card-element');
        }
      });
  }
  goBack() {
    this.toastrService.warning('You canceled your order!');
    this.router.navigate(['/shop']).then( () => {
        window.location.reload();
    });
  }
  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          const mealList = [];
          this.meals.forEach( e => {
            const object = {
              id: e.id,
              title: e.title,
              price: e.price,
              quantity: e.quantity,
            };
            mealList.push(object);
          });
          const order = {
            user: { id: 1},
            meals: mealList,
            overallPrice: this.totalPrice,
            paymentType: 'card',
            status: 1,
          };
          this.orderService.save(order).subscribe( perf => {
            this.toastrService.success('Payment successful');
            const stripeObject = {
              token: result.token.id,
              amount: this.totalPriceWithDelivery,
              description: `${perf.id}`,
            };
            this.orderService.paymentCharge(stripeObject).subscribe( data => {
              console.log(data);
            });
            this.router.navigate(['/checkout/success'], {state: {
              user: this.user,
              totalPrice: this.totalPriceWithDelivery,
              }});
          }, error => {
            this.router.navigate(['/checkout/failure']);
            console.log(error);
          });
          console.log(result);
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
        } else if (result.error) {
          this.toastrService.warning(result.error.message);
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
