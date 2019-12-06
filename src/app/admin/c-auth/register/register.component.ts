import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbRegisterComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../../@core/real-services/auth.service';
import {NbToastrService} from '@nebular/theme';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent extends NbRegisterComponent {

  date: any;
  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
              cd: ChangeDetectorRef, router: Router,
              private authService: AuthService,
              private toastr: NbToastrService) {
    super(service, options, cd, router);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = new Date(event.value).toISOString();
  }
  register(): void {
    console.log(this.user);
    const userObject = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
      login: this.user.login,
      address: this.user.address,
      birthday: this.date,
      password: this.user.password,
      role: { id: 2 },
    };
    console.log(userObject);
    // @ts-ignore
    this.authService.register(userObject).toPromise()
      .then(responce => {
        this.toastr.success('User is registered!');
        this.router.navigate(['/auth/login']);
      }).catch(() => this.toastr.danger('Incorrect data'));
  }
}
