import { NgModule } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { AuthElementsModule } from '@app/auth-elements/auth-elements.module';

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    SharedModule,
    AuthElementsModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
