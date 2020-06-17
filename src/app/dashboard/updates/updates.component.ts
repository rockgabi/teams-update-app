import { Component, OnInit } from '@angular/core';
import { UpdateService } from 'src/app/shared/update.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/shared/project.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  public updates: [] = [];
  public project: any = null;
  public updateText: string = '';
  public projectId: number = null;
  public date;
  public user: any = null;

  constructor(
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private updateService: UpdateService,
    private projectService: ProjectService,
    private authService: AuthService,
  ) {
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.updateService.getObservable(this.projectId).subscribe(updates => this.updates = updates);
    this.updateService.fetch(this.projectId);
    this.projectService.fetchById(this.projectId).then(project => this.project = project);

    this.authService.user$.subscribe(user => this.user = user);
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

  postUpdate() {
    if (this.updateText) {
      this.updateService.create(this.projectId, {content: this.updateText}).then(() => {
        this.toastrService.success('Update has been posted');
        this.updateText = '';
      });
    }
  }

}
