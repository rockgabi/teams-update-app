import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  createProject() {
    this.projectService.create(this.form).then((data: any) => {
      this.toastr.success('Project has been created');
      this.router.navigate(['dashboard/projects']);
    }, e => this.toastr.error('Project could not be created', 'There was a problem'));
  }

}
