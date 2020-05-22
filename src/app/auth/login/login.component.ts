import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(public authService: AuthService) {}
  private authStatusSub: Subscription;
  isLoading = false;
  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthstatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
