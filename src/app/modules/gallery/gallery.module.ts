import { NgModule } from '@angular/core';
import { GalleryThumbComponent } from './components/gallery-thumb/gallery-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { GalleryFormComponent } from './components/gallery-form/gallery-form.component';
import { GalleryPictureFormComponent } from './components/gallery-picture-form/gallery-picture-form.component';
import { PostModule } from '@app/post/post.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryModule as NgxGalleryModule } from '@ngx-gallery/core';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { GalleryTableComponent } from './components/gallery-table/gallery-table.component';
import { GalleryLightboxComponent } from './components/gallery-lightbox/gallery-lightbox.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { CovalentFileModule } from '@covalent/core/file';
import { GalleryPictureThumbComponent } from './components/gallery-picture-thumb/gallery-picture-thumb.component';

@NgModule({
  declarations: [
    GalleryThumbComponent,
    GalleryFormComponent,
    GalleryPictureFormComponent,
    GalleryTableComponent,
    GalleryLightboxComponent,
    GalleryPictureThumbComponent
  ],
    exports: [
        GalleryThumbComponent,
        GalleryFormComponent,
        GalleryTableComponent,
        GalleryLightboxComponent,
        GalleryPictureThumbComponent
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
    ShareButtonsModule,
  ]
})
export class GalleryModule {
}
