import { NgModule } from '@angular/core';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { PostModule } from '@app/post/post.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [SettingsFormComponent],
  exports: [
    SettingsFormComponent
  ],
  imports: [
    SharedModule,
    PostModule,
    MatTabsModule
  ]
})
export class SettingModule {
}
