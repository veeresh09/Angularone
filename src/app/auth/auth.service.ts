import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private isAuthenticated = false;
  private userId: string;
  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const User: AuthData = {
      email: email,
      password: password,
    };
    return this.http
      .post<{ message: string; result: any }>(
        'http://localhost:3000/api/user/signup',
        User
      )
      .subscribe(
        (response) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }
  login(email: string, password: string) {
    const User: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://localhost:3000/api/user/login',
        User
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.userId = response.userId;
            const expiresIn = response.expiresIn;
            this.setAuthTimer(expiresIn);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn * 1000);
            this.SaveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }
  getisAuth() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }
  getAuthstatusListener() {
    return this.authStatusListener.asObservable();
  }
  getUserId() {
    return this.userId;
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }
  private SaveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.userId = authInformation.userId;
    }
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (token && expiration) {
      return {
        token: token,
        expirationDate: new Date(expiration),
        userId: userId,
      };
    }
    return;
  }
  private setAuthTimer(Duration: number) {
    const tokenTimer = setTimeout(() => {
      this.logout();
    }, Duration * 1000);
  }
}
