import { Component } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { environment } from '../environments/environment';
import { I18nService } from '@app/shared/services/i18n.service';
import { PermissionService } from '@app/api/services/permission.service';
import { GoogleAnalyticsService } from '@app/shared/services/google-analytics.service';
import { NavigationEnd, Router } from '@angular/router';
import { ScriptService } from 'ngx-script-loader';

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
              private router: Router,
              private scriptService: ScriptService) {
    this.emitPageViews();

    this.i18nService.init(environment.defaultLanguage, [
      'es-MX'
    ]);

    this.scriptService.loadScript('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
      .subscribe(() => {
        console.log('adsense loaded');
        (((window as any).adsbygoogle || []) as any[]).push({
          google_ad_client: environment.googleAdSense.adClient,
          enable_page_level_ads: true
        });
      });
  }


  emitPageViews() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.googleAnalytics.pageView(event.urlAfterRedirects);
      }
    });
  }
}
