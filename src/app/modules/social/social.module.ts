import { NgModule } from '@angular/core';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    ShareButtonsModule,
    MatSnackBarModule,
  ],
  declarations: [],
  exports: [],
  providers: [],
  entryComponents: []
})
export class SocialModule {
}
