import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { ProjectService } from 'src/app/shared/project.service';

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
  }

  removeUser(userId) {
    this.projectService.removeUser(this.id, userId);
  }

}
