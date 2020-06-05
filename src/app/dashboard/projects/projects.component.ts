import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public ownedProjects: [] = [];

  constructor(
    private projectService: ProjectService,
  ) {
    this.projectService.ownedProjects.subscribe(projects => this.ownedProjects = projects);
  }

  ngOnInit(): void {
  }

  initials(name: string) {
    const sp = name.split(' ', 2);
    if (sp.length > 1) {
      return sp[0][0] + sp[1][0];
    } else {
      return sp[0][0];
    }
  }

}
