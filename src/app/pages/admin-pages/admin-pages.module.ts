import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { NewPostPageComponent } from './components/new-post-page/new-post-page.component';

@NgModule({
  declarations: [NewPostPageComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
  ]
})
export class AdminPagesModule { }
