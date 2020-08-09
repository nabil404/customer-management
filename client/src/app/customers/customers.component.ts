import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  breadcrumb: string[] = [];

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    let url = this.router.url.substring(1).split('/');
    this.breadcrumb = url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        url = this.router.url.substring(1).split('/');
      }
      this.breadcrumb = url;
    });
  }

  onCustomerAddButtonClick() {
    this.dialog.open(CustomerFormComponent);
  }
}
