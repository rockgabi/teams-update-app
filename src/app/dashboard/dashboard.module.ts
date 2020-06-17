import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { Folder, CreditCard, User, Bell, MoreVertical, Plus, PlusCircle, Trash2, Check } from 'angular-feather/icons';
import { NgbPopoverModule, NgbButtonsModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectService } from '../shared/project.service';
import { AuthGuardService as AuthGuard } from '../shared/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { UsersComponent } from './projects/users/users.component';
import { ParticipantProjectsComponent } from './participant-projects/participant-projects.component';
import { UpdatesComponent } from './updates/updates.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'projects/add', component: NewProjectComponent, canActivate: [AuthGuard] },
      { path: 'projects/:id/users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'participating-projects', component: ParticipantProjectsComponent, canActivate: [AuthGuard] },

      { path: 'projects/:id/updates', component: UpdatesComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent, ProjectsComponent, NewProjectComponent, UsersComponent, ParticipantProjectsComponent, UpdatesComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NzTimelineModule,
    NzIconModule,
    FeatherModule.pick({ Folder, CreditCard, User, Bell, MoreVertical, Plus, PlusCircle, Trash2, Check }),
    NgbButtonsModule,
    NgbPopoverModule,
    NgbDatepickerModule,
  ],
  exports: [RouterModule, FeatherModule],
  providers: [ProjectService],
})
export class DashboardModule {

}
