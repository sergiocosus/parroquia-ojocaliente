import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

moment.locale('es');
registerLocaleData(localeMX, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ApiModule.forRoot({
      apiUrl: environment.api.url,
      apiClientID: environment.api.clientID,
      apiClientSecret: environment.api.clientSecret,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
