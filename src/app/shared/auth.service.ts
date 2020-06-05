import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return new Promise((res, rej) => {
      this.http.post('http://localhost:3000/login', { email, password }).subscribe((data: any) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user);
          res(data);
        } else {
          res(false);
        }
      }, err => rej());
    });
  }

  register(name: string, email: string, password: string) {
    return new Promise((res, rej) => {
      this.http.post('http://localhost:3000/register', { name, email, password }).subscribe((data: any) => {
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
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
