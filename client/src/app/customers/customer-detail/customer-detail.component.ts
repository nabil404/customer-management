import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../customers.service';
import { CustomersService } from '../customers.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  customer: Customer;
  id: string;
  customerSub: Subscription;
  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerSub = this.customersService
      .getCustomer(this.id)
      .subscribe((customer) => (this.customer = customer));
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }
}
