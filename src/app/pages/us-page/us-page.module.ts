import { NgModule } from '@angular/core';

import { UsPageRoutingModule } from './us-page-routing.module';
import { UsPageComponent } from './components/us-page/us-page.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [UsPageComponent],
  imports: [
    SharedModule,
    UsPageRoutingModule
  ]
})
export class UsPageModule {
}
