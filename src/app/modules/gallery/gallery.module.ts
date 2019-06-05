import { NgModule } from '@angular/core';
import { GalleryThumbComponent } from './components/gallery-thumb/gallery-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { GalleryFormComponent } from './components/gallery-form/gallery-form.component';
import { GalleryPictureFormComponent } from './components/gallery-picture-form/gallery-picture-form.component';
import { PostModule } from '@app/post/post.module';
import { MatExpansionModule, MatProgressBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { CovalentFileModule } from '@covalent/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryModule as NgxGalleryModule } from '@ngx-gallery/core';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { GalleryTableComponent } from './components/gallery-table/gallery-table.component';

@NgModule({
  declarations: [
    GalleryThumbComponent,
    GalleryFormComponent,
    GalleryPictureFormComponent,
    GalleryTableComponent
  ],
  exports: [
    GalleryThumbComponent,
    GalleryFormComponent,
    GalleryTableComponent
  ],
  imports: [
    SharedModule,
    NgxGalleryModule,
    LightboxModule,
    PostModule,
    MatProgressBarModule,
    CovalentFileModule,
    PinchZoomModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
  ]
})
export class GalleryModule {
}
