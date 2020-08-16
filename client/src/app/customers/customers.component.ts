import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  breadcrumb: string[] = [];
  languages: { code: string; name: string }[];
  customerNameSub: Subscription;
  customerName: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'bn']);
    translate.setDefaultLang('en');
    translate.use('en');

    this.languages = [
      { code: 'en', name: 'English' },
      { code: 'bn', name: 'বাংলা' },
    ];
  }

  ngOnInit(): void {
    let url = this.router.url.substring(1).split('/');
    this.breadcrumb = url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        url = this.router.url.substring(1).split('/');
      }
      this.breadcrumb = url;
    });

    //Get selected language from local storage
    if (localStorage.getItem('language')) {
      this.translate.use(localStorage.getItem('language'));
    }
  }

  onLanguageSelect(e) {
    this.translate.use(e.value);

    //Store selected language to local storage
    localStorage.setItem('language', e.value);
  }

  onCustomerAddButtonClick() {
    this.dialog.open(CustomerFormComponent);
  }

  onRouterOutletActivate(event: any) {
    if (event instanceof CustomerDetailComponent) {
      this.customerNameSub = event.customerName.subscribe(
        (res: { name: string }) => (this.customerName = res.name)
      );
    }
  }

  ngOnDestroy() {
    this.customerNameSub.unsubscribe();
  }
}
