import { Component } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { environment } from '../environments/environment';
import { I18nService } from '@app/shared/services/i18n.service';
import { PermissionService } from '@app/api/services/permission.service';
import { GoogleAnalyticsService } from '@app/shared/services/google-analytics.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService,
              private i18nService: I18nService,
              private permissionService: PermissionService,
              private googleAnalytics: GoogleAnalyticsService,
              private router: Router) {
    this.emitPageViews();

    this.i18nService.init(environment.defaultLanguage, [
      'es-MX'
    ]);
  }


  emitPageViews() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.googleAnalytics.pageView(event.urlAfterRedirects);
      }
    });
  }
}
