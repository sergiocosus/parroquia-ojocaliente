import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryPageRoutingModule } from './gallery-page-routing.module';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { GalleryModule } from '@app/gallery/gallery.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [GalleryPageComponent],
  imports: [
    CommonModule,
    GalleryPageRoutingModule,
    GalleryModule,
    SharedModule
  ]
})
export class GalleryPageModule {
}
