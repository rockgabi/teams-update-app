import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-participant-projects',
  templateUrl: './participant-projects.component.html',
  styleUrls: ['./participant-projects.component.scss']
})
export class ParticipantProjectsComponent implements OnInit {

  public participantProjects: [] = [];

  constructor(
    private projectService: ProjectService,
  ) {
    this.projectService.participantProjects.subscribe( projects => this.participantProjects = projects);
   }

  ngOnInit(): void {}

  initials(name: string) {
    const sp = name.split(' ', 2);
    if (sp.length > 1) {
      return sp[0][0] + sp[1][0];
    } else {
      return sp[0][0];
    }
  }

}
