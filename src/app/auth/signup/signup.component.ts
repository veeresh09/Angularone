import { Component, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: '',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent {
  isLoading = false;
  onLogin(form: NgForm) {}
}
