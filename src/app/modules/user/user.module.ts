import { NgModule } from '@angular/core';
import { UserImageComponent } from '@app/user/components/user-image/user-image.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    UserImageComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    UserImageComponent,
  ]
})
export class UserModule {
}
