import { BrowserModule, BrowserTransferStateModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
import { environment } from '../environments/environment';
import { ApiModule } from '@app/api/api.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdsenseModule } from 'ng2-adsense';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MyHammerConfig } from '@app/shared/services/my-hammer-config';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { shareButtonsConfig } from './core/config/share-button-config';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
// import { CacheModule, CACHE } from '@ngx-cache/core';
// import { BrowserCacheModule, MemoryCacheService } from '@ngx-cache/platform-browser';

moment.locale('es');
registerLocaleData(localeMX, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    /*
    CacheModule.forRoot(),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService // or, LocalStorageCacheService
      }
    ]),
    */
    BrowserTransferStateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ApiModule.forRoot({
      apiUrl: environment.api.url,
      apiClientID: environment.api.clientID,
      apiClientSecret: environment.api.clientSecret,
    }),
    AdsenseModule.forRoot({
      adClient: environment.googleAdSense.adClient,
      adSlot: environment.googleAdSense.adSlot,
    }),
    ShareButtonsModule.withConfig(shareButtonsConfig),
    ShareIconsModule
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es-MX'},
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    {provide: LOCALE_ID, useValue: 'es-MX'},
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
