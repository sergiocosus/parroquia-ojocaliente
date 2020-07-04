import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Notify } from '@app/shared/services/notify.service';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';
import { extract } from '@app/shared/services/i18n.service';
import { TdFileInputComponent } from '@covalent/core/file';

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
  @ViewChild(TdFileInputComponent, {static: true}) tdFileInput: TdFileInputComponent;
  @Input() image_srcset: string;

  src: string;
  fileName: string;
  imageChangedEvent = null;
  crop = false;

  constructor(private notify: Notify) {
    super();
    this.formControl.valueChanges.subscribe(picture => {
      if (!picture) {
        this.imageChangedEvent = null;
        this.src = null;
        this.fileName = null;
        this.crop = null;
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

  changed(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageChangedEvent = {
        target: {files: [file]}
      };
      this.fileName = file.name;
      this.setImage(reader.result, this.fileName);
    };
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
