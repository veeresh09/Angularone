import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userisauthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authservice: AuthService) {}
  ngOnInit() {
    this.userisauthenticated = this.authservice.getisAuth();
    this.authListenerSubs = this.authservice
      .getAuthstatusListener()
      .subscribe((isAuthenticated) => {
        this.userisauthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  onLogOut() {
    this.authservice.logout();
  }
}
