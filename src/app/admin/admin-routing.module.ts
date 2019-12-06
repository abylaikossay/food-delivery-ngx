import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'auth',
      loadChildren: () => import('./c-auth/c-auth.module').then(m => m.CAuthModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'shop',
      loadChildren: () => import('./home/home.module')
        .then(m => m.HomeModule),
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule),
    },
    {
      path: 'checkout',
      loadChildren: () => import('./checkout/checkout.module')
        .then(m => m.CheckoutModule),
    },
    {
      path: 'info',
      loadChildren: () => import('./restaurant/restaurant.module')
        .then(m => m.RestaurantModule),
    },
    {
      path: '',
      redirectTo: 'shop',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
},
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
