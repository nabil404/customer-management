import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomersService } from './customers/customers.service';
import { tap, map, subscribeOn } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface CustomerData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  citizenship: string;
}

interface CustomersResponse {
  status: string;
  data: {
    customers: CustomerData[];
  };
}

interface CustomerResponse {
  status: string;
  data: {
    customer: CustomerData;
  };
}

interface AuthResponse {
  status: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  userToken = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private customersService: CustomersService,
    private router: Router
  ) {}

  checkAuth() {
    let token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }
    this.userToken.next(token);
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>('http://localhost:3000/api/v1/users/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((res) => {
          this.userToken.next(res.token);
          localStorage.setItem('jwt', res.token);
        })
      );
  }

  logout() {
    this.userToken.next(null);
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

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
