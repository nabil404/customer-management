import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerDeleteComponent } from '../customers-list/customer-delete/customer-delete.component';
import { Customer, CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: Customer[];
  customersSub: Subscription;

  constructor(
    private customerService: CustomersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = this.customerService.customers;
    this.customersSub = this.customerService.customersUpdated.subscribe(
      (customers: Customer[]) => {
        this.dataSource = customers;
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
