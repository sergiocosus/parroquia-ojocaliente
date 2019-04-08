import { NgModule } from '@angular/core';
import { SelectMediaDialogComponent } from './select-media-dialog/select-media-dialog.component';
import { MediaThumbComponent } from './media-thumb/media-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [SelectMediaDialogComponent, MediaThumbComponent],
  imports: [
    SharedModule,
    ImageCropperModule,
    MatExpansionModule,
  ],
  entryComponents: [
    SelectMediaDialogComponent,
  ]
})
export class MediaModule {
}
