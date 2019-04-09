import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '@app/api/services/post.service';
import { extract } from '@app/shared/services/i18n.service';
import { Notify } from '@app/shared/services/notify.service';
import { Router } from '@angular/router';
import { Post } from '@app/api/models/post.model';
import { MatDialog } from '@angular/material';
import { SelectMediaDialogComponent } from '@app/media/select-media-dialog/select-media-dialog.component';
import { filter } from 'rxjs/operators';
import { PostCkeditorComponent } from '@app/post/components/post-ckeditor/post-ckeditor.component';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnChanges {
  @Input() post: Post;
  @ViewChild(PostCkeditorComponent) postCkEditor: PostCkeditorComponent;

  form: FormGroup;
  isBrowser: boolean;

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private notify: Notify,
              private router: Router,
              private dialog: MatDialog) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image_base64: [],
      thumbnail: [],
      categories: [[]],
    });
  }

  ngOnInit() {
  }

  private initForm() {
    if (this.post) {
      this.form.reset({
        title: this.post.title,
        content: this.post.content,
        categories: this.post.categories,
      });
    } else {
      this.form.reset({
        categories: []
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.initForm();
    }
  }

  get categoriesForm() {
    return this.form.get('categories');
  }

  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();
    data.category_ids = data.categories.map(category => category.id);
    data.categories = undefined;

    if (this.post) {
      this.postService.edit(this.post.slug, data).subscribe(post => {
        this.router.navigateByUrl(post.viewUrl);
      });
    } else {
      this.postService.post(data).subscribe(
        post => {
          this.router.navigateByUrl(post.viewUrl);
        },
        error => this.notify.error(error)
      );
    }
  }


  addImageToPost() {
    this.dialog.open(SelectMediaDialogComponent).afterClosed()
      .pipe(filter(Boolean)).subscribe(media => {
      console.log(media);
      this.postCkEditor.addImage(media.url);
    });
  }

}
