import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Customer, CustomersService } from '../customers.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: Customer[];
  customersSub: Subscription;

  constructor(
    private customerService: CustomersService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiService.fetchCustomers().subscribe();

    this.customersSub = this.customerService.customersUpdated.subscribe(
      (customers: Customer[]) => {
        this.dataSource = customers;
      }
    );
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }
}
