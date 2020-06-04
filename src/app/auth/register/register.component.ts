import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: any = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  register() {
    const { name, email, password } = this.form;
    this.authService.register(name, email, password).then((data: any) => {
      if (data && data.token) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
