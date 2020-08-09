import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { exhaustMap } from 'rxjs/operators';

export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  citizenship: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  customersUpdated = new Subject<Customer[]>();

  public customers: Customer[];

  constructor(private apiService: ApiService) {}

  getCustomer(id: string) {
    return this.apiService.fetchCustomer(id);
  }

  getCustomers() {
    this.apiService.fetchCustomers().subscribe((customers) => {
      this.customers = customers;
      this.customersUpdated.next([...this.customers]);
    });
  }

  addCustomer(customer: Customer) {
    this.apiService.createCustomer(customer).subscribe((customer) => {
      this.customers.push(customer);
      this.customersUpdated.next([...this.customers]);
    });
  }

  editCustomer(customer: Customer, id: string) {
    this.apiService
      .updateCustomer(customer, id)
      .pipe(exhaustMap(() => this.apiService.fetchCustomers()))
      .subscribe((customers) => {
        this.customers = customers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  deleteCustomer(id: string) {
    this.apiService
      .deleteCustomer(id)
      .pipe(exhaustMap(() => this.apiService.fetchCustomers()))
      .subscribe((customers) => {
        this.customers = customers;
        this.customersUpdated.next([...this.customers]);
      });
  }
}
