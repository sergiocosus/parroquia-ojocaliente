import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GalleryPicture } from '@app/api/models/gallery-picture.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GalleryService } from '@app/api/services/gallery.service';
import { extract } from '@app/shared/services/i18n.service';
import { Notify } from '@app/shared/services/notify.service';
import { uploadProgressOperator } from '@app/shared/functions/uploadProgressOperator';
import { UploadPictureComponent } from '@app/shared/components/upload-picture/upload-picture.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-gallery-picture-form',
  templateUrl: './gallery-picture-form.component.html',
  styleUrls: ['./gallery-picture-form.component.scss']
})
export class GalleryPictureFormComponent implements OnInit {
  @ViewChild(UploadPictureComponent) uploadPicture: UploadPictureComponent;
  @Input() galleryPicture: GalleryPicture;
  @Input() gallery_slug: string;
  @Output() deleted = new EventEmitter();

  form: FormGroup;
  loading = 0;

  constructor(private fb: FormBuilder,
              private galleryService: GalleryService,
              private notify: Notify,
              private dialog: MatDialog) {
    this.form = this.fb.group({
      title: [],
      content: [],
      picture: [],
    });

    this.form.get('picture').valueChanges.pipe(
      filter(Boolean),
    ).subscribe((picture) => {
      if (!this.galleryPicture.id) {
        this.submit();
      }
    });
  }

  ngOnInit() {
    this.fillForm(this.galleryPicture);
  }

  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }
    const data = this.form.getRawValue();

    if (this.galleryPicture.id) {
      this.galleryService.picturePut(this.galleryPicture.slug, data)
        .pipe(uploadProgressOperator(p => this.loading = p))
        .subscribe(
          galleryPicture => {
            this.galleryPicture.replaceProperties(galleryPicture);
            this.fillForm(galleryPicture);
            this.notify.showTranslated(extract('form.updatedSuccess'));
          },
          error => this.notify.error(error)
        );
    } else {
      this.galleryService.picturePost(this.gallery_slug, data)
        .pipe(uploadProgressOperator(p => this.loading = p))
        .subscribe(
          galleryPicture => {
            this.galleryPicture.replaceProperties(galleryPicture);
            this.form.get('picture').setValue(null);
            this.fillForm(galleryPicture);
          },
          error => this.notify.error(error)
        );
    }
  }

  private fillForm(galleryPicture: GalleryPicture) {
    if (galleryPicture.file) {
      this.form.reset({
        title: galleryPicture.file.name,
        content: ' ',
      });
      this.uploadPicture.changed(galleryPicture.file);
    } else {
      this.form.reset({
        title: galleryPicture.title,
        content: galleryPicture.content,
      });
    }
  }
}
