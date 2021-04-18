import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { filter, first, map, mergeMap } from 'rxjs/operators';
import { RouterChangedEvent } from '../../models/router-events';
import { NotificationService } from '../notifications/notification.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private routerChangedEvent$ = new BehaviorSubject<RouterChangedEvent>(null);

  get routerChangedEvent() {
    return this.routerChangedEvent$.asObservable().pipe(filter((e) => e !== null));
  }

  get routerData() {
    return this.routerChangedEvent$.getValue();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => {
          let currentRoute = this.route;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          return { event, currentRoute };
        }),
        mergeMap(({ event, currentRoute }) =>
          forkJoin({
            routerEvent: of(event) as Observable<NavigationEnd>,
            routeData: (currentRoute.data as BehaviorSubject<any>).pipe(first()),
            routeParams: (currentRoute.params as BehaviorSubject<any>).pipe(first()),
            activatedRoute: of(currentRoute)
          })
        )
      )
      .subscribe({
        next: (data) => this.routerChangedEvent$.next(data)
      });
  }

  handleError(err: any, message?: string): void {
    this.stopProgress();
    this.notification.error(message || 'Cannot load data');
    console.error(err);
  }

  startProgress(): void {
    // todo - implement start progressbar
  }

  stopProgress(): void {
    // todo - implement stop progressbar
  }
}
