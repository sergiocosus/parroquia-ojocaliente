import { NgModule } from '@angular/core';
import { CurrentUserMenuComponent } from './components/current-user-menu/current-user-menu.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';

@NgModule({
  declarations: [
    CurrentUserMenuComponent,
    LogoutButtonComponent,
  ],
  imports: [
    SharedModule,
    UserModule,
    AuthModule,
  ],
  exports: [
    CurrentUserMenuComponent,
    LogoutButtonComponent,
  ]
})
export class AuthElementsModule { }
