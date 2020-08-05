import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomersService } from './customers/customers.service';
import { tap, map } from 'rxjs/operators';

interface CustomersResponse {
  status: string;
  data: {
    customers: {
      _id: string;
      name: string;
      phone: string;
      email: string;
      address: string;
      citizenship: string;
    }[];
  };
}

interface CustomerResponse {
  status: string;
  data: {
    customer: {
      _id: string;
      name: string;
      phone: string;
      email: string;
      address: string;
      citizenship: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private customersService: CustomersService
  ) {}

  fetchCustomers() {
    return this.http
      .get<CustomersResponse>('http://localhost:3000/api/v1/customers')
      .pipe(
        map((response) => {
          return response.data.customers.map((res) => {
            const { _id, name, phone, email, address, citizenship } = res;
            return { id: _id, name, phone, email, address, citizenship };
          });
        }),
        tap((customers) => {
          this.customersService.setCustomers(customers);
        })
      );
  }

  fetchCustomer(id: string) {
    return this.http
      .get<CustomerResponse>(`http://localhost:3000/api/v1/customers/${id}`)
      .pipe(
        map((response) => {
          const {
            _id,
            name,
            phone,
            email,
            address,
            citizenship,
          } = response.data.customer;
          return { id: _id, name, phone, email, address, citizenship };
        })
      );
  }
}
