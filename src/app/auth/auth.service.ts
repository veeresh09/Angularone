import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const User: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ message: string; result: any }>(
        'http://localhost:3000/api/user/signup',
        User
      )
      .subscribe((response) => {});
  }
  login(email:string,password:string){
    const User:AuthData={
      email:email,
      password:password,
    };
    this.http.post<{token:string}>('http://localhost:3000/api/user/login',User).subscribe((response) => {});
  }
}
