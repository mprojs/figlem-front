import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Figure } from '../../../../models/editor.models';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'fl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  figure: Figure;
  figureId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editorService: EditorService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.editorService.clearLastOpenedFigure();
    this.editorService.figure$.subscribe({
      next: (data) => {
        this.figure = data;
        this.cd.detectChanges();
      }
    });

    this.figureId = this.route.snapshot.params.figureId;
    if (this.figureId) {
      this.loadFigure(+this.figureId);
    }
  }

  loadFigure(id: number): void {
    this.editorService.loadFigure(id);
  }

  onUploadImage(e: any): void {
    console.dir(e.target.files[0]);
    if (this.figureId) {
      this.editorService.uploadImage(e.target.files[0], this.figureId);
    } else {
      this.editorService
        .createFigure(e.target.files[0], +this.route.snapshot.params.projectId)
        .subscribe({
          next: (data) => {
            window.history.replaceState(
              {},
              '',
              this.router.url.split('/').concat([data.id.toString()]).join('/')
            );
          }
        });
    }
  }

  onSaveLemmas(): void {
    this.editorService.saveFigure();
  }
}
