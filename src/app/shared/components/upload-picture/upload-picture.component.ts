import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Notify } from '@app/shared/services/notify.service';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadPictureComponent),
    multi: true
  }]
})
export class UploadPictureComponent extends BaseFormControlWrapperValueAccessor implements OnInit {
  @ViewChild('file') file: ElementRef;
  @Input() image_srcset: string;

  src: string;
  fileName: string;
  imageChangedEvent = null;

  crop = false;

  @HostListener('click') click() {
    this.file.nativeElement.click();
  }

  constructor(private notify: Notify) {
    super();
    this.formControl.valueChanges.subscribe(picture => {
      console.log(picture, 'sdf');
      if (!picture) {
        this.imageChangedEvent = null;
        this.src = null;
        this.fileName = null;
      }
    });
  }

  ngOnInit() {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.src = event.base64;

    this.formControl.setValue({
      base64: this.src.split(',')[1],
      name: this.fileName
    });
  }

  loadImageFailed() {
    this.notify.show(extract('common.invalidFileType'));
    this.src = null;
    this.formControl.setValue(null);
  }

  changed($event) {
    this.imageChangedEvent = $event;
    const file = $event.target.files[0];
    this.fileName = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => this.setImage(reader.result, this.fileName);
  }

  setImage(base64, name) {
    this.src = base64;
    this.formControl.setValue({
      base64: base64.split(',')[1], name
    });
  }

  toogleGroup() {
    this.crop = !this.crop;
    if (!this.crop) {
      this.changed(this.imageChangedEvent);
    }
  }
}
