import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Import App routing Module
import { AppRoutingModule } from './app-routing.module';

//Import Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomerDeleteComponent } from './customers/customers-list/customer-delete/customer-delete.component';
import { ErrorPageComponent } from './error-page/error-page.component';

//Import Angular Material Module
import { MaterialModule } from './material/material.module';

//Import Interceptor for adding authorization header with every url
import { ApiInterceptorService } from './api-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    CustomersComponent,
    CustomerFormComponent,
    CustomersListComponent,
    CustomerDetailComponent,
    CustomerDeleteComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
