import { NgModule } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { AuthElementsModule } from '@app/auth-elements/auth-elements.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    SharedModule,
    AuthElementsModule,
    NgxPermissionsModule,
    MatExpansionModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
