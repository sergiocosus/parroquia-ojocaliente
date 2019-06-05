import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Gallery } from '@app/api/models/gallery.model';
import { Gallery as GalleryService, GalleryItem, GalleryRef, ImageSize, ThumbnailsPosition } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

@Component({
  selector: 'app-gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.scss']
})
export class GalleryThumbComponent implements OnInit {
  @ViewChild('itemTemplate') itemTemplate;
  @ViewChild('thumbTemplate') thumbTemplate;
  @Input() gallery: Gallery;

  items: GalleryItem[];
  private lightboxRef: GalleryRef;

  constructor(public galleryService: GalleryService,
              public lightbox: Lightbox) {
  }

  openGallery() {
    this.lightbox.open(0, this.gallery.slug, {panelClass: 'fullscreen'});
  }

  ngOnInit() {
    this.lightboxRef = this.galleryService.ref(this.gallery.slug);

    this.items = this.gallery.gallery_pictures.map(
      picture => ({
        type: 'imageViewer',
        data: {
          title: picture.title,
          srcset: picture.image_srcset,
        }
      }));

    this.lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
      itemTemplate: this.itemTemplate,
      thumbTemplate: this.thumbTemplate,
      thumbLoadingIcon: ''
    });

    this.lightboxRef.load(this.items);
  }

  close() {
    this.lightbox.close();
  }
}
