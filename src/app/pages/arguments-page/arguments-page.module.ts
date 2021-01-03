import { NgModule } from '@angular/core';

import { ArgumentsPageRoutingModule } from './arguments-page-routing.module';
import { ArgumentsPageComponent } from './components/arguments-page/arguments-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { ElementsModule } from '@app/elements/elements.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [ArgumentsPageComponent],
    imports: [
        SharedModule,
        ArgumentsPageRoutingModule,
        ElementsModule,
        MatExpansionModule
    ]
})
export class ArgumentsPageModule {
}
