import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  constructor(private http: HttpClient,
              private router: Router,
              private toastrService: NbToastrService,
              ) { }

  // chargeCard(token: string) {
  //   const headers = new Headers({'toke': token, 'amount': 100});
  //   this.http.post('http://localhost:8080/payment/charge', {}, {headers: headers})
  //     .subscribe(resp => {
  //       console.log(resp);
  //     })
  // }
}
