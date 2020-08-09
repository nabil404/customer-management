import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  menuOpened = false; //Sidebar menu opened(true) or closed(false)

  constructor(private router: Router, private apiService: ApiService) {
    //Close side menu if opened while navigation
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.menuOpened = false;
      }
    });
  }

  ngOnInit(): void {
    //Check jwt in local storage
    this.apiService.checkAuth();
  }

  onMenuButtonClick() {
    this.menuOpened = !this.menuOpened;
  }
}
