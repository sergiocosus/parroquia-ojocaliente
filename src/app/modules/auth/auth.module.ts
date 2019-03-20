import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { ResetPasswordRequestDialogComponent } from './components/reset-password-request-dialog/reset-password-request-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ResetPasswordRequestDialogComponent,
    RegisterComponent,
    LoginDialogComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordRequestDialogComponent,
  ],
  entryComponents: [
    ResetPasswordRequestDialogComponent,
    LoginDialogComponent,
  ]
})
export class AuthModule {
}
