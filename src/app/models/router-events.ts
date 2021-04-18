import { ActivatedRoute, NavigationEnd } from '@angular/router';

export interface RouterChangedEvent {
  routerEvent: NavigationEnd;
  routeData: any;
  routeParams: any;
  activatedRoute: ActivatedRoute;
}
