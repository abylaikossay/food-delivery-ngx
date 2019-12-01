import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../../@core/real-services/auth.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {

  errors = [];

  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
              cd: ChangeDetectorRef, router: Router,
              private authService: AuthService,
              private toastr: NbToastrService) {
    super(service, options, cd, router);
  }


  login(): void {
    this.authService.login(this.user.email, this.user.password)
      .toPromise()
      .then(res => {
        // this.authService.authenticated().subscribe( perf => {
        //   console.log(perf);
        //   localStorage.setItem('employeeBrandId', perf['brandId']);
        //   localStorage.setItem('employeePartnerId', perf['partner'].id);
        //   localStorage.setItem('employeeId', perf['id']);
        // });
          this.authService.authorize(res);
      }).catch(() => this.toastr.danger('Login or password is incorrect'));
  }

}
