import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserImageComponent } from '@app/user/components/user-image/user-image.component';

@NgModule({
  declarations: [
    UserImageComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserImageComponent,
  ]
})
export class UserModule { }
