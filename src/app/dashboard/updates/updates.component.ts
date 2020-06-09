import { Component, OnInit } from '@angular/core';
import { UpdateService } from 'src/app/shared/update.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  public updates: [] = [];
  public project: any = null;

  constructor(
    private route: ActivatedRoute,
    private updateService: UpdateService,
    private projectService: ProjectService,
  ) {
    const projectId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.updateService.getObservable(projectId).subscribe(updates => this.updates = updates);
    this.updateService.fetch(projectId);
    this.projectService.fetchById(projectId).then(project => this.project = project);
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
