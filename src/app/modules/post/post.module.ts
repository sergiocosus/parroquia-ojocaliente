import { NgModule } from '@angular/core';
import { PostThumbComponent } from './components/post-thumb/post-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import {
  MatAutocompleteModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressBarModule
} from '@angular/material';
import { CategoryModule } from '@app/category/category.module';
import { MediaModule } from '@app/media/media.module';
import { CommentModule } from '@app/comment/comment.module';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { PostCkeditorComponent } from './components/post-ckeditor/post-ckeditor.component';
import { AdsenseModule } from 'ng2-adsense';
import { PostsTableComponent } from './components/posts-table/posts-table.component';
import { PostCategoriesComponent } from './components/post-categories/post-categories.component';

@NgModule({
  declarations: [
    PostThumbComponent,
    PostDetailComponent,
    PostFormComponent,
    PostCkeditorComponent,
    PostsTableComponent,
    PostCategoriesComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
  ],
  exports: [
    PostThumbComponent,
    PostFormComponent,
    PostDetailComponent,
    PostsTableComponent,
  ]
})
export class PostModule {
}
