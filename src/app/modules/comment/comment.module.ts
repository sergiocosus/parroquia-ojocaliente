import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { UserModule } from '@app/user/user.module';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [CommentFormComponent, CommentComponent],
  exports: [
    CommentFormComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UserModule,
    MomentModule
  ]
})
export class CommentModule { }
