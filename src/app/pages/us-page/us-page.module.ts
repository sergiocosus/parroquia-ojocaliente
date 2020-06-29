import { NgModule } from '@angular/core';

import { UsPageRoutingModule } from './us-page-routing.module';
import { UsPageComponent } from './components/us-page/us-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { ElementsModule } from '@app/elements/elements.module';

@NgModule({
  declarations: [UsPageComponent],
    imports: [
        SharedModule,
        UsPageRoutingModule,
        ElementsModule
    ]
})
export class UsPageModule {
}
