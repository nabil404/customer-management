import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerDeleteComponent } from '../customers-list/customer-delete/customer-delete.component';
import { Customer, CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  private customersSub: Subscription;
  isLoading = false;
  dataSource: Customer[];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private customerService: CustomersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.customerService.getCustomers();
    this.customersSub = this.customerService.customersUpdated.subscribe(
      (customers: Customer[]) => {
        this.dataSource = customers;
        this.isLoading = false;
      }
    );
  }

  onCustomerEdit(element: Customer) {
    this.dialog.open(CustomerFormComponent, { data: element });
  }

  onCustomerDelete(element: Customer) {
    this.dialog.open(CustomerDeleteComponent, { data: element });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }
}
