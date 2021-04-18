import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ROUTE_ANIMATIONS_ELEMENTS, routeAnimations } from './animations/route.animations';
import { AnimationsService } from './animations/animations.service';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { NotificationService } from './notifications/notification.service';
import {
  faCog,
  faBars,
  faRocket,
  faPowerOff,
  faUserCircle,
  faPlayCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

export { routeAnimations, ROUTE_ANIMATIONS_ELEMENTS, AnimationsService, NotificationService };

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, SharedModule, FontAwesomeModule],
  declarations: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  exports: [FormsModule, FontAwesomeModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    faIconLibrary: FaIconLibrary
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    faIconLibrary.addIcons(
      faCog,
      faBars,
      faRocket,
      faPowerOff,
      faUserCircle,
      faPlayCircle,
      faGithub,
      faMediumM,
      faTwitter,
      faInstagram,
      faYoutube
    );
  }
}
