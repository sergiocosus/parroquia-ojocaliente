import { Component, OnInit } from '@angular/core';
import { MediaService } from '@app/api/services/media.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { filter, finalize, startWith, tap } from 'rxjs/operators';
import { Pagination } from '@app/api/models/pagination';
import { Media } from '@app/api/models/media.model';
import { MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';
import { HttpEventType } from '@angular/common/http';
import { uploadProgressOperator } from '@app/shared/functions/uploadProgressOperator';

@Component({
  selector: 'app-select-media-dialog',
  templateUrl: './select-media-dialog.component.html',
  styleUrls: ['./select-media-dialog.component.scss']
})
@AutoUnsubscribe()
export class SelectMediaDialogComponent implements OnInit {
  filterForm: FormGroup;
  uploadForm: FormGroup;

  sub = new SubscriptionManager();

  lastPagination = new Pagination<Media>().parse({last_page: 0, data: []});
  media: Media[] = [];

  src: string;
  fileName: string;
  imageChangedEvent = null;

  loadingProgress = 0;
  loadingMedias = false;

  constructor(private mediaService: MediaService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<SelectMediaDialogComponent>,
              private notify: Notify) {
    this.filterForm = this.fb.group({
      search: [],
    });

    this.uploadForm = this.fb.group({
      base64: [],
      name: [],
    });
  }

  ngOnInit() {
    this.checkForm();
  }

  checkForm() {
    this.sub.add = this.filterForm.valueChanges.pipe(
      startWith(true)
    ).subscribe(values => {
      this.media = [];
      this.lastPagination.current_page = 0;
      this.loadPictures();
    });
  }

  loadPictures() {
    const data = this.filterForm.getRawValue();

    this.loadingMedias = true;
    this.mediaService.getPaginated({...data, page: this.lastPagination.current_page + 1})
      .pipe(finalize(() => this.loadingMedias = false))
      .subscribe(pagination => {
        this.lastPagination = pagination;
        this.media.push(...pagination.data);
      });
  }

  selectMedia(media: Media) {
    this.dialogRef.close(media);
  }


  imageCropped(event: ImageCroppedEvent) {
    this.src = event.base64;

    this.uploadForm.setValue({
      base64: this.src.split(',')[1],
      name: this.fileName
    });
  }

  loadImageFailed() {
    this.notify.show(extract('forms.invalidFile'));
    this.src = null;
    this.uploadForm.get('image_base64').setValue(null);
  }

  changed($event) {
    this.imageChangedEvent = $event;
    this.fileName = $event.target.files[0].name;
  }

  uploadMedia() {
    if (this.uploadForm.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.uploadForm.getRawValue();
    this.mediaService.post(data).pipe(
      uploadProgressOperator(progress => this.loadingProgress = progress),
    ).subscribe(
      media => {
        this.uploadForm.reset();
        this.imageChangedEvent = null;
        this.media.unshift(media);
      },
      error => this.notify.error(error)
    );

  }
}
