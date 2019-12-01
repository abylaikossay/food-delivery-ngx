import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {NgxStripeModule} from 'ngx-stripe';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NgxStripeModule.forRoot('pk_test_VBq7GCrvaTVVGuKg7tNfJQd100wRtFlWWt'),
  ],
  declarations: [
    AdminComponent,
  ],
  exports: [
  ],
})
export class AdminModule {
}
