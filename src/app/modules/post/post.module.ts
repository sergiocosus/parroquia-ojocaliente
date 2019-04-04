import { NgModule } from '@angular/core';
import { PostThumbComponent } from './components/post-thumb/post-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { CategoryModule } from '@app/category/category.module';

@NgModule({
  declarations: [
    PostThumbComponent,
    PostDetailComponent,
    PostFormComponent,
  ],
  imports: [
    SharedModule,
    CKEditorModule,
    ImageCropperModule,
    MatChipsModule,
    MatAutocompleteModule,
    CategoryModule,
  ],
  exports: [
    PostThumbComponent,
    PostFormComponent,
  ]
})
export class PostModule {
}
