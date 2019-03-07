import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinksPageRoutingModule } from './links-page-routing.module';
import { LinksPageComponent } from './components/links-page/links-page.component';

@NgModule({
  declarations: [LinksPageComponent],
  imports: [
    CommonModule,
    LinksPageRoutingModule
  ]
})
export class LinksPageModule { }
