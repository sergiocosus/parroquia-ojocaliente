import { NgModule } from '@angular/core';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from '@app/auth/auth.module';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    SharedModule,
    RegisterPageRoutingModule,
    AuthModule
  ]
})
export class RegisterPageModule { }
