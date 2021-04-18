import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HelperService } from '../../../core/common/helper.service';
import { Project, ProjectFull } from '../../../models/project.models';
import { ProjectApiService } from './project-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects = new BehaviorSubject<Project[]>(null);
  get projects$(): Observable<Project[]> {
    return this.projects.asObservable();
  }

  project = new BehaviorSubject<ProjectFull>(null);
  get project$(): Observable<ProjectFull> {
    return this.project.asObservable();
  }

  private readonly onError: (err: any) => void;

  constructor(private api: ProjectApiService, private helperService: HelperService) {
    this.onError = (err) => this.helperService.handleError(err);
  }

  loadProjects(): void {
    this.api.loadProjects().subscribe({
      next: (data: Project[]) => {
        this.projects.next(data);
      },
      error: this.onError
    });
  }

  loadProject(id: number): void {
    this.api.loadProject(id).subscribe({
      next: (data: ProjectFull) => {
        this.project.next(data);
      },
      error: this.onError
    });
  }

  clearLastOpenedProject(): void {
    this.project.next(null);
  }

  removeFigure(figureId: number, projectId: number): void {
    const project = this.project.getValue();
    if (project.id === projectId) {
      this.project.next({
        ...project,
        figures: project.figures.filter((fig) => fig.id !== figureId)
      });
    }

    this.api.removeFigure(figureId).subscribe({
      next: () => {},
      error: (err: any) => {
        this.onError(err);
        this.loadProject(projectId);
      }
    });
  }
}
