import { NgModule } from '@angular/core';
import { UserImageComponent } from '@app/user/components/user-image/user-image.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [
    UserImageComponent,
    UserFormComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    UserImageComponent,
    UserFormComponent,
  ]
})
export class UserModule {
}
