import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers.service';
import { ApiService } from 'src/app/api.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;
  id: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.apiService
        .fetchCustomer(this.id)
        .subscribe((customer) => (this.customer = customer));
    });
  }
}
