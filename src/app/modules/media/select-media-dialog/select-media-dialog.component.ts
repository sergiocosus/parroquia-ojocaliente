import { Component, OnInit } from '@angular/core';
import { MediaService } from '@app/api/services/media.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { startWith } from 'rxjs/operators';
import { Pagination } from '@app/api/models/pagination';
import { Media } from '@app/api/models/media.model';
import { MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';

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
      this.lastPagination.current_page = 0;
      this.loadPictures();
    });
  }

  loadPictures() {
    const data = this.filterForm.getRawValue();

    this.mediaService.getPaginated({...data, page: this.lastPagination.current_page + 1})
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
    this.notify.show('Tipo de archivo inválido');
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
    this.mediaService.post(data).subscribe(
      media => {
        this.media.unshift(media);
      },
      error => this.notify.error(error)
    );

  }
}
