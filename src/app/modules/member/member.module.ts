import { NgModule } from '@angular/core';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [MemberFormComponent],
  exports: [
    MemberFormComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MemberModule {
}
