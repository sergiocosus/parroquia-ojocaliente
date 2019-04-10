import { NgModule } from '@angular/core';
import { PostThumbComponent } from './components/post-thumb/post-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { CategoryModule } from '@app/category/category.module';
import { MediaModule } from '@app/media/media.module';
import { CommentModule } from '@app/comment/comment.module';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { PostCkeditorComponent } from './components/post-ckeditor/post-ckeditor.component';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    PostThumbComponent,
    PostDetailComponent,
    PostFormComponent,
    PostCkeditorComponent,
  ],
  imports: [
    SharedModule,
    CKEditorModule,
    ImageCropperModule,
    MatChipsModule,
    MatAutocompleteModule,
    CategoryModule,
    MediaModule,
    CommentModule,
    ShareButtonsModule,
    AdsenseModule,
  ],
  exports: [
    PostThumbComponent,
    PostFormComponent,
    PostDetailComponent,
  ]
})
export class PostModule {
}
