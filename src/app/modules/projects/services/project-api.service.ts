import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectFull } from '../../../models/project.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {
  constructor(private http: HttpClient) {}

  loadProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }

  loadProject(id: number): Observable<ProjectFull> {
    return this.http.get<ProjectFull>('/api/projects/' + id);
  }

  removeFigure(id: number): Observable<any> {
    return this.http.delete<any>('/api/figures/' + id);
  }
}
