import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { ProjectService } from 'src/app/shared/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public form: any = {
    email: '',
  };
  private id: number = null;
  public project: any = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastr: ToastrService,
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.projectService.ownedProjects.pipe(
      map((projects: []) => projects.find((project: any) => project.id === this.id))
    ).subscribe(project => {
      this.project = project ? project : null;
    });
  }

  ngOnInit() { }

  addUser() {
    this.projectService.addUserByEmail(this.id, this.form.email);
    this.form.email = '';
    this.toastr.success('User has been added to the project', 'Operation complete');
  }

  removeUser(userId) {
    this.projectService.removeUser(this.id, userId);
    this.toastr.success('User has been removed from the project', 'Operation complete');
  }

}
