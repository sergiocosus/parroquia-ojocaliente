import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BLOG_API_CONFIG, BlogApiConfig } from './types/api-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { IfLoggedDirective } from '@app/api/directives/if-logged.directive';
import { IfSettingDirective } from '@app/api/directives/if-setting.directive';

@NgModule({
  declarations: [
    IfLoggedDirective,
    IfSettingDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    IfLoggedDirective,
    IfSettingDirective,
  ]
})
export class ApiModule {
  static forRoot(config: BlogApiConfig): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {provide: BLOG_API_CONFIG, useValue: config},
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
      ],
    };
  }
}
