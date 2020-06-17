import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;
  user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    let storedUser: any = localStorage.getItem('user');
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      this.http.get(env.apiBaseUrl + 'me').subscribe(user => {
        this.user = user;
        this.user$.next(user);
      }, (e) => this.logout());
    }
   }

  login(email: string, password: string) {
    return new Promise((res, rej) => {
      this.http.post(env.apiBaseUrl + 'login', { email, password }).subscribe((data: any) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.user = data.user;
          this.user$.next(data.user);
          res(data);
        } else {
          res(false);
        }
      }, err => rej());
    });
  }

  register(name: string, email: string, password: string) {
    return new Promise((res, rej) => {
      this.http.post(env.apiBaseUrl + 'register', { name, email, password }).subscribe((data: any) => {
        if (data && data.token) {
          res(data);
        } else {
          res(false);
        }
      }, err => rej());
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.user$.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
