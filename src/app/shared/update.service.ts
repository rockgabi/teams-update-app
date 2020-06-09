import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public ownedUpdates: BehaviorSubject<[]> = new BehaviorSubject([]);
  public participantUpdates: BehaviorSubject<[]> = new BehaviorSubject([]);

  public updates: any = {};

  constructor(
    private http: HttpClient,
  ) {

  }

  fetch(projectId) {
    this.http.get(env.apiBaseUrl + 'projects/' + projectId + '/updates').subscribe((updates: []) => {
      this.notify(projectId, updates);
    });
  }

  create(projectId, data) {
    return new Promise((res, rej) => {
      this.http.post(env.apiBaseUrl + 'projects/' + projectId + '/updates', data).subscribe((update) => {
        this.fetch(projectId);
        res(update);
      });
    });
  }

  update(projectId, updateId, data) {
    return new Promise((res, rej) => {
      this.http.put(env.apiBaseUrl + 'projects/' + projectId + '/updates' + '/' + updateId, data).subscribe((update) => {
        this.fetch(projectId);
        res(update);
      });
    });
  }

  delete(projectId, updateId) {
    return new Promise((res, rej) => {
      this.http.delete(env.apiBaseUrl + 'projects/' + projectId + '/updates/' + updateId, {}).subscribe(() => {
        this.fetch(projectId);
        res();
      });
    });
  }

  notify(projectId, updates) {
    const observable = this.getObservable(projectId);
    observable.next(updates);
  }

  getObservable(projectId): BehaviorSubject<[]> {
    if (!this.updates.hasOwnProperty(projectId)) {
      this.updates[projectId] = new BehaviorSubject([]);
    }
    return this.updates[projectId];
  }
}
