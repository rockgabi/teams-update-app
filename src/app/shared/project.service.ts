import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public ownedProjects: BehaviorSubject<[]> = new BehaviorSubject([]);
  public participantProjects: BehaviorSubject<[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
  ) {
    this.fetchOwnedProjects();
    this.fetchParticipantProjects();
  }

  fetchOwnedProjects() {
    this.http.get(env.apiBaseUrl + 'projects?owned=true').subscribe((data: []) => {
      this.ownedProjects.next(data);
    });
  }

  fetchParticipantProjects() {
    this.http.get(env.apiBaseUrl + 'projects?owned=false').subscribe((data: []) => {
      this.participantProjects.next(data);
    });
  }

  create(data) {
    return new Promise((res, rej) => {
      this.http.post(env.apiBaseUrl + 'projects', data).subscribe((project) => {
        this.fetchOwnedProjects();
        res(project);
      });
    });
  }

  update(id, data) {
    return new Promise((res, rej) => {
      this.http.put(env.apiBaseUrl + 'projects' + '/' + id, data).subscribe((project) => {
        // this.fetchOwnedProjects();
        res(project);
      });
    });
  }

  addUserByEmail(projectId, email) {
    return new Promise((res, rej) => {
      this.http.post(env.apiBaseUrl + 'projects/' + projectId + '/users/' + email, {}).subscribe((project) => {
        this.fetchOwnedProjects();
        res(project);
      });
    });
  }

  removeUser(projectId, userId) {
    return new Promise((res, rej) => {
      this.http.delete(env.apiBaseUrl + 'projects/' + projectId + '/users/' + userId, {}).subscribe(() => {
        this.fetchOwnedProjects();
        res();
      });
    });
  }
}
