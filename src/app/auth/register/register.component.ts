import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  register() {
    const { name, email, password } = this.form;
    this.authService.register(name, email, password).then((data: any) => {
      if (data && data.token) {
        this.toastr.success('Registration complete');
        this.router.navigate(['/auth/login']);
      } else {
        this.toastr.error('We could not process your registration', 'There was a problem');
      }
    }, (e) => this.toastr.error('We could not process your registration', 'There was a problem'));
  }

}
