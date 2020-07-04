import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PostCommentService } from '@app/api/services/post-comment.service';
import { extract } from '@app/shared/services/i18n.service';
import { Notify } from '@app/shared/services/notify.service';
import { Post } from '@app/api/models/post.model';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '@app/auth/components/login-dialog/login-dialog.component';
import { SessionService } from '@app/api/services/session.service';
import { User } from '@app/api/models/user.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() post: Post;
  @Output() created = new EventEmitter();
  @ViewChild(FormGroupDirective, {static: false}) myForm: FormGroupDirective;


  form: FormGroup;
  user: User;

  constructor(private commentService: PostCommentService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog,
              private sessionService: SessionService) {
    this.form = this.fb.group({
      content: ['', Validators.required]
    });

    this.sessionService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

  ngOnInit() {
  }


  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();

    this.commentService.store(this.post.slug, data).subscribe(
      comment => {
        console.log(comment);
        this.created.emit(comment);
        this.form.reset();
        this.myForm.resetForm();
        this.notify.showTranslated(extract('comment.success'));
      },
      error => this.notify.error(error)
    );
  }

  openLogin() {
    this.dialog.open(LoginDialogComponent);
  }
}
