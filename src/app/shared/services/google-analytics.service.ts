import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  production = environment.production;
  trackingId = environment.googleAnalytics.trakingId;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (this.production) {
      ga('create', this.trackingId, 'auto');
    } else {
      ga('create', this.trackingId, 'none');
    }
  }


  pageView(url: string) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (this.production) {
      ga('set', 'page', url);
      ga('send', 'pageview');
    }
  }

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }
}
