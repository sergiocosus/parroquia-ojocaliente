import { Component, Input, OnInit } from '@angular/core';
import { GalleryPicture } from '@app/api/models/gallery-picture.model';

@Component({
  selector: 'app-gallery-picture-thumb',
  templateUrl: './gallery-picture-thumb.component.html',
  styleUrls: ['./gallery-picture-thumb.component.scss']
})
export class GalleryPictureThumbComponent implements OnInit {
  @Input() galleryPicture: GalleryPicture;

  constructor() {
  }

  ngOnInit(): void {
  }

}
