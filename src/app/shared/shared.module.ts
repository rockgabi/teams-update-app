import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth.interceptor';
import { ProjectService } from './project.service';
import { AuthGuardService } from './auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthInterceptorService,
    AuthGuardService,
    ProjectService,
  ],
  exports: [

  ]
})
export class SharedModule { }
