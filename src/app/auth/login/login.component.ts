import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: any = {
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

  login() {
    const { email, password } = this.form;
    this.authService.login(email, password).then((data: any) => {
      if (data && data.token) {
        this.toastr.success('Welcome ' + data.user.name, 'Authenticated');
        this.router.navigate(['/dashboard/projects']);
      } else {
        this.toastr.error('Could not authenticate your credentials', 'There was a problem');
      }
    }, (e) => this.toastr.error('Could not authenticate your credentials', 'There was a problem'));
  }

}
