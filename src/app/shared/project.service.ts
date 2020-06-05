import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public ownedProjects: BehaviorSubject<[]> = new BehaviorSubject([]);
  public projects: BehaviorSubject<[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
  ) {
    this.fetchOwnedProjects();
    this.fetchProjects();
  }

  fetchOwnedProjects() {
    this.http.get('http://localhost:3000/projects?owned=true').subscribe((data: []) => {
      this.ownedProjects.next(data);
    });
  }

  fetchProjects() {
    this.http.get('http://localhost:3000/projects').subscribe((data: []) => {
      this.projects.next(data);
    });
  }

  create(data) {
    return new Promise((res, rej) => {
      this.http.post('http://localhost:3000/projects', data).subscribe((project) => {
        this.fetchOwnedProjects();
        res(project);
      });
    });
  }
}
