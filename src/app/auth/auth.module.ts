import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: '', component: LandingComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
];

@NgModule({
    declarations: [AuthComponent, LoginComponent, RegisterComponent, LandingComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot(routes),
        SharedModule,
        HttpClientModule
    ],
    exports: [RouterModule],
    providers: [],
})
export class AuthModule {

}
