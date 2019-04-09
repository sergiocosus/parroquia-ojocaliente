import { Component } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { environment } from '../environments/environment';
import { I18nService } from '@app/shared/services/i18n.service';
import { PermissionService } from '@app/api/services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService,
              private i18nService: I18nService,
              private permissionService: PermissionService) {
    this.i18nService.init(environment.defaultLanguage, [
      'en-US',
      'es-MX'
    ]);
  }

  title = 'angular-blog';
}
