import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() menuButtonClicked = new EventEmitter<void>();
  private tokenSub: Subscription;
  loggedIn: Boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.tokenSub = this.apiService.userToken.subscribe((res) => {
      this.loggedIn = !!res;
    });

    if (this.loggedIn) {
      this.router.navigate(['/customers']);
    }
  }

  onMenuButtonClicked() {
    this.menuButtonClicked.emit();
  }

  logout() {
    this.apiService.logout();
  }

  ngOnDestroy() {
    this.tokenSub.unsubscribe();
  }
}
