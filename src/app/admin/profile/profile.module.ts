import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbTabsetModule} from '@nebular/theme';


@NgModule({
  declarations: [ProfileComponent, UserProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbTabsetModule,
  ],
})
export class ProfileModule { }
