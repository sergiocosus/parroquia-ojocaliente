import { NgModule } from '@angular/core';
import { SelectMediaDialogComponent } from './select-media-dialog/select-media-dialog.component';
import { MediaThumbComponent } from './media-thumb/media-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [SelectMediaDialogComponent, MediaThumbComponent],
  imports: [
    SharedModule,
    ImageCropperModule,
    MatExpansionModule,
    MatProgressBarModule,
  ],
  entryComponents: [
    SelectMediaDialogComponent,
  ]
})
export class MediaModule {
}
