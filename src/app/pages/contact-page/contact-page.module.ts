import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    ContactPageRoutingModule,
    SharedModule
  ]
})
export class ContactPageModule { }
