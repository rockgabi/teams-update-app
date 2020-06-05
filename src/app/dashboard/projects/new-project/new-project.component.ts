import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  public form: any = {
    name: '',
    public: false,
  };

  constructor(
    private router: Router,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
  }

  createProject() {
    this.projectService.create(this.form).then((data: any) => {
      this.router.navigate(['dashboard/projects']);
    });
  }

}
