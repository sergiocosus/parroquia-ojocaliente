import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Notify } from '@app/shared/service/notify.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {
  @ViewChild('file') file: ElementRef;
  @Input() control: FormControl;
  @Input() image_srcset: string;

  src: string;
  fileName: string;
  imageChangedEvent = null;

  @HostListener('click') click() {
    this.file.nativeElement.click();
  }

  constructor(private notify: Notify) {
  }

  ngOnInit() {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.src = event.base64;

    console.log(this.control);
    this.control.setValue({
      base64: this.src.split(',')[1],
      name: this.fileName
    });
  }

  loadImageFailed() {
    this.notify.show('Tipo de archivo inválido');
    this.src = null;
    this.control.setValue(null);
  }

  changed($event) {
    this.imageChangedEvent = $event;
    this.fileName = $event.target.files[0].name;
  }
}
