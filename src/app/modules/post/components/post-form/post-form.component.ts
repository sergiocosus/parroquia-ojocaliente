import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '@app/api/services/post.service';
import { extract } from '@app/shared/service/i18n.service';
import { Notify } from '@app/shared/service/notify.service';
import { Router } from '@angular/router';
import { Post } from '@app/api/models/post.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CategoryService } from '@app/api/services/category.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() post: Post;
  public Editor = ClassicEditor;
  editorConfig = null;

  form: FormGroup;

  src: string;
  fileName: string;
  imageChangedEvent = null;

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private notify: Notify,
              private router: Router,
              private categoryService: CategoryService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image_base64: [],
      thumbnail: [],
      categories: [[]],
    });


  }

  ngOnInit() {
    if (this.post) {
      this.form.reset({
        title: this.post.title,
        content: this.post.content,
        categories: this.post.categories,
      });
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

  imageCropped(event: ImageCroppedEvent) {
    this.src = event.base64;

    this.form.get('thumbnail').setValue({
      base64: this.src.split(',')[1],
      name: this.fileName
    });
  }

  loadImageFailed() {
    this.notify.show('Tipo de archivo inválido');
    this.src = null;
    this.form.get('image_base64').setValue(null);
  }

  changed($event) {
    this.imageChangedEvent = $event;
    this.fileName = $event.target.files[0].name;
  }
}
