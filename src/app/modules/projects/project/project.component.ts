import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'fl-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy {
  constructor(public projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.loadProject(+id);
  }

  onRemoveFigure(figureId: number, projectId: number): void {
    this.projectService.removeFigure(figureId, projectId);
  }

  ngOnDestroy(): void {
    this.projectService.clearLastOpenedProject();
  }
}
