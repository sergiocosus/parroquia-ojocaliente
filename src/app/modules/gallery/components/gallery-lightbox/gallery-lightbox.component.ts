import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Gallery } from '@app/api/models/gallery.model';
import { Gallery as GalleryService, GalleryItem, GalleryRef, ImageSize, ThumbnailsPosition } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss']
})
export class GalleryLightboxComponent implements OnInit {
  @ViewChild('itemTemplate', {static: false}) itemTemplate;
  @ViewChild('thumbTemplate', {static: false}) thumbTemplate;
  @Input() gallery: Gallery;
  @Output() closed = new EventEmitter();

  items: GalleryItem[];
  private lightboxRef: GalleryRef;
  expanded = false;

  constructor(public lightbox: Lightbox,
              public galleryService: GalleryService) {
  }

  ngOnInit() {
  }

  private initLightbox() {
    this.lightboxRef = this.galleryService.ref(this.gallery.slug);

    this.items = this.gallery.gallery_pictures.map(
      picture => ({
        type: 'imageViewer',
        data: picture
      }));

    this.lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
      itemTemplate: this.itemTemplate,
      thumbTemplate: this.thumbTemplate,
      thumbLoadingIcon: '',
      gestures: false,
    });

    this.lightboxRef.indexChanged.subscribe(() => this.expanded = false);

    this.lightboxRef.load(this.items);
  }

  openGallery(gallery: Gallery) {
    this.gallery = gallery;
    this.initLightbox();
    this.lightbox.open(0, this.gallery.slug, {panelClass: 'fullscreen'});
    this.lightbox.closed.subscribe(() => this.closed.emit());
  }

  close() {
    this.lightbox.close();
  }
}
