import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects/projects.component';

import { FeatherModule } from 'angular-feather';
import { Folder, CreditCard, User, Bell, MoreVertical, Plus, PlusCircle } from 'angular-feather/icons';
import { ProjectService } from '../shared/project.service';
import { AuthGuardService as AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'updates', component: ProjectsComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  declarations: [DashboardComponent, ProjectsComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FeatherModule.pick({ Folder, CreditCard, User, Bell, MoreVertical, Plus, PlusCircle }),
  ],
  exports: [RouterModule, FeatherModule],
  providers: [ProjectService],
})
export class DashboardModule {

}
