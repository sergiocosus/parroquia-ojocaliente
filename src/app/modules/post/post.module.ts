import { NgModule } from '@angular/core';
import { PostThumbComponent } from './components/post-thumb/post-thumb.component';
import { SharedModule } from '@app/shared/shared.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    PostThumbComponent,
    PostDetailComponent,
    PostFormComponent
  ],
  imports: [
    SharedModule,
    CKEditorModule,
  ],
  exports: [
    PostThumbComponent,
  ]
})
export class PostModule {
}
