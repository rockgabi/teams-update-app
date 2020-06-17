import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public ownedProjects: [] = [];
  public projects: [] = [];
  public cycle: 'daily' | 'weekly' = null;
  public colorSettings = [
    { color: 'a', hex: '5ebd56' },
    { color: 'b', hex: 'f2d62c' },
    { color: 'c', hex: 'ff9e2b' },
    { color: 'd', hex: 'ec5947' },
    { color: 'e', hex: 'c377dd' },
    { color: 'f', hex: '1482c2' },
    { color: 'g', hex: '02c2df' },
    { color: 'h', hex: '4ce89c' },
    { color: 'h', hex: 'f674c2' },
    { color: 'h', hex: '334661' },
  ];

  constructor(
    private projectService: ProjectService,
  ) {
    this.projectService.ownedProjects.subscribe(projects => this.ownedProjects = projects);
    this.projectService.participantProjects.subscribe(projects => this.projects = projects);
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

  toggleColor(project, color) {
    if (project.color === color) {
      project.color = null;
    } else {
      project.color = color;
    }
    this.projectService.update(project.id, project);
  }

  updateProject(project) {
    this.projectService.update(project.id, project);
  }

}
