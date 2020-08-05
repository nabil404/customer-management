import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Customer {
  id: string;
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

  private customers: Customer[] = [];

  constructor() {}

  getCustomers() {
    return [...this.customers];
  }

  setCustomers(customers: Customer[]) {
    this.customers = customers;
    this.customersUpdated.next([...this.customers]);
  }
}
