import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbRegisterComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../../@core/real-services/auth.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent extends NbRegisterComponent {


  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
              cd: ChangeDetectorRef, router: Router,
              private authService: AuthService,
              private toastr: NbToastrService) {
    super(service, options, cd, router);
  }

  register(): void {
    this.authService.register(this.user).toPromise()
      .then(() => {
        this.router.navigate(['/auth/login']);
      }).catch(() => this.toastr.danger('Incorrect data'));
  }
}
