import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { HelperService } from '../../../core/common/helper.service';
import { Figure, Lemma, PointChangedEvent } from '../../../models/editor.models';
import { RouteKeys } from '../../../models/route-keys';
import { RouterChangedEvent } from '../../../models/router-events';
import { EditorApiService } from './editor-api.service';
import { EditorCoreService } from './editor-core.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private figure = new BehaviorSubject<Figure>(null);

  get figure$(): Observable<Figure> {
    return this.figure.asObservable().pipe(filter((item) => !!item));
  }

  private pointChanged = new Subject<PointChangedEvent>();

  get pointChanged$(): Observable<PointChangedEvent> {
    return this.pointChanged.asObservable();
  }

  private readonly onError: (err?: any) => void;

  constructor(
    private api: EditorApiService,
    private core: EditorCoreService,
    private helperService: HelperService
  ) {
    this.onError = (err) => this.helperService.handleError(err);

    /**
     * Subscribe to router events and clear this.figure in the case when figure editor opened with
     * another figure id
     */
    this.helperService.routerChangedEvent
      .pipe(filter((data) => data.routeData?.key === RouteKeys.figureEditor))
      .subscribe({
        next: (data: RouterChangedEvent) => {
          if (data.routeParams.figureId !== this.figure.getValue()?.id.toString()) {
            this.figure.next(null);
          }
        }
      });
  }

  createFigure(imageFile: any, projectId: number): Observable<Figure> {
    return this.updateImage(imageFile, null, projectId).pipe(
      tap((data: Figure) => this.figure.next(data)),
      catchError((err) => {
        this.onError(err);
        return of(null);
      }),
      filter((data) => data !== null)
    );
  }

  loadFigure(id: number): void {
    this.api.loadFigure(id).subscribe({
      next: (data) => {
        this.figure.next(data);
      },
      error: this.onError
    });
  }

  uploadImage(file: any, figureId: number): void {
    this.updateImage(file, figureId, null).subscribe({
      next: (data: Figure) => {
        this.figure.next(data);
      },
      error: this.onError
    });
  }

  /**
   * Method uploads file to server and if figureId passed - updates image fields in Figure,
   * otherwise creates new Figure and assigns projectId to it.
   */
  private updateImage(file: any, figureId: number, projectId: number): Observable<Figure> {
    return this.api.uploadImage(file).pipe(
      switchMap((res) => {
        return this.api.saveFigure({
          imageUrl: res.url,
          imageId: res.id,
          id: figureId,
          projectId
        });
      })
    );
  }

  saveFigure(): void {
    this.helperService.startProgress();
    this.api.saveFigure(this.figure.getValue()).subscribe({
      next: () => this.helperService.stopProgress(),
      error: this.onError
    });
  }

  addPoint(offsetX: number, offsetY: number): void {
    const figure = this.figure.getValue();
    const currentIndex = this.nextLemmaIndex(figure.lemmas);
    this.pointChanged.next({
      isNew: true,
      lemma: {
        index: currentIndex + 1,
        offsetX,
        offsetY,
        value: '',
        isActive: false,
        isGroup: false
      }
    });
  }

  clearLastOpenedFigure(): void {
    this.figure.next(null);
  }

  private nextLemmaIndex(lemmas: Lemma[]): number {
    return lemmas.reduce((acc, lemma) => {
      if (lemma.children) {
        const maxIndex = this.nextLemmaIndex(lemma.children);
        return acc > maxIndex ? acc : maxIndex;
      } else {
        return acc > lemma.index ? acc : lemma.index;
      }
    }, 0);
  }
}
