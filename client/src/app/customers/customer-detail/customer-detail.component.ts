import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
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
  @Output() customerName = new EventEmitter<{ name: string }>();

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
      .subscribe((customer) => {
        this.customer = customer;
        this.customerName.emit({ name: customer.name });
      });
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }
}
