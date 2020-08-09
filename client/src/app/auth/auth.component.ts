import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  tokenSub: Subscription;
  loginForm: FormGroup;
  isSubmitting: Boolean = false;
  error: string = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.tokenSub = this.apiService.userToken.subscribe((res) => {
      if (res) {
        this.router.navigate(['/customers']);
      }
    });

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    const form = this.loginForm;

    if (!form.valid) {
      return;
    }

    const email = form.value.username;
    const password = form.value.password;

    this.apiService.login(email, password).subscribe(
      (res) => {
        this.isSubmitting = false;
        this.router.navigate(['/customers']);
      },
      (err) => {
        this.isSubmitting = false;
        if (err.error instanceof ProgressEvent && err.error.type === 'error') {
          return (this.error = 'Failed to connect to the server');
        }
        this.error = err.error.message;
      }
    );

    form.reset();
  }
}
