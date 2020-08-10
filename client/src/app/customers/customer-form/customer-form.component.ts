import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  editMode = false;

  constructor(
    private customerService: CustomersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.editMode = true;
    }
    this.customerForm = new FormGroup({
      name: new FormControl(
        this.data ? this.data.name : null,
        Validators.required
      ),
      phone: new FormControl(
        this.data ? this.data.phone : null,
        Validators.required
      ),
      email: new FormControl(this.data ? this.data.email : null, [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl(
        this.data ? this.data.address : null,
        Validators.required
      ),
      citizenship: new FormControl(
        this.data ? this.data.citizenship : null,
        Validators.required
      ),
    });
  }

  onSubmit() {
    const form = this.customerForm;

    if (!form.valid) {
      return;
    }
    if (!this.editMode) {
      this.customerService.addCustomer(this.customerForm.value);
    } else {
      this.customerService.editCustomer(this.customerForm.value, this.data.id);
    }
  }
}
