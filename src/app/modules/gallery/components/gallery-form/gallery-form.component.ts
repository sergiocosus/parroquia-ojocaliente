import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Notify } from '@app/shared/services/notify.service';
import { GalleryService } from '@app/api/services/gallery.service';
import { Gallery } from '@app/api/models/gallery.model';
import { extract } from '@app/shared/services/i18n.service';
import { uploadProgressOperator } from '@app/shared/functions/uploadProgressOperator';
import { GalleryPicture } from '@app/api/models/gallery-picture.model';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { filter, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit, OnChanges {
  @Input() gallery: Gallery;
  form: FormGroup;
  loading = 0;

  galleryPictures: GalleryPicture[];
  addPictureControl = new FormControl();

  constructor(private fb: FormBuilder,
              private galleryService: GalleryService,
              private notify: Notify,
              private router: Router,
              private dialog: MatDialog) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      picture: [null, Validators.required],
    });

    this.addPictureControl.valueChanges.subscribe((files: File | FileList) => {
      if (files instanceof File) {
        this.galleryPictures.push(new GalleryPicture().parse({file: files}));
      } else if (files instanceof FileList) {
        Array.from(files).forEach(file => {
          this.galleryPictures.push(new GalleryPicture().parse({file}));
        });
      }
    });
  }

  ngOnInit() {
  }


  private initForm() {
    if (this.gallery) {
      this.form.reset({
        title: this.gallery.title,
        content: this.gallery.content,
      });
      this.form.get('picture').setValidators([]);
    } else {
      this.form.reset({
        is_published: false
      });
      this.form.get('picture').setValidators(Validators.required);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gallery']) {
      if (this.gallery) {
        this.galleryPictures = this.gallery.gallery_pictures;
      } else {
        this.galleryPictures = null;
      }
      this.initForm();
    }
  }

  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();

    if (this.gallery) {
      this.galleryService.put(this.gallery.slug, data)
        .pipe(uploadProgressOperator(progress => this.loading = progress))
        .subscribe(gallery => {
            this.gallery = gallery;
            this.initForm();
            this.notify.showTranslated(extract('form.updatedSuccess'));
          },
          error => this.notify.error(error)
        );
    } else {
      this.galleryService.post(data)
        .pipe(uploadProgressOperator(progress => this.loading = progress))
        .subscribe(gallery => {
            this.gallery = gallery;
            this.router.navigateByUrl(gallery.editUrl);

            this.initForm();
            this.notify.showTranslated(extract('form.createdSuccess'));
          },
          error => this.notify.error(error)
        );
    }
  }

  delete(galleryPicture: GalleryPicture) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: galleryPicture.title,
        message: extract('common.deleteConfirm'),
      } as ConfirmDialogData
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.galleryService.pictureDelete(galleryPicture.slug))
    ).subscribe(
      () => _.remove(this.gallery.gallery_pictures, galleryPicture),
      error => this.notify.error(error)
    );
  }
}
