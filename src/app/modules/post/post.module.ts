import { NgModule } from '@angular/core';
import { PostThumbComponent } from './components/post-thumb/post-thumb.component';
import { SharedModule } from '../../shared/shared.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

@NgModule({
  declarations: [PostThumbComponent, PostDetailComponent],
  imports: [
    SharedModule
  ],
  exports: [
    PostThumbComponent,
  ]
})
export class PostModule {
}
