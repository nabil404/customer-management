import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CustomersListComponent },
      { path: ':id', component: CustomerDetailComponent },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
