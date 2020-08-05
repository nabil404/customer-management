import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuOpened = false;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.menuOpened = false;
      }
    });
  }

  onMenuButtonClick() {
    this.menuOpened = !this.menuOpened;
  }
}
