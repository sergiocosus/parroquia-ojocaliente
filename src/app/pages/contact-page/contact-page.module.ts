import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    ContactPageRoutingModule
  ]
})
export class ContactPageModule { }
