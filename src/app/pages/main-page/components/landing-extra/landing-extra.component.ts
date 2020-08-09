import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GalleryService } from '@app/api/services/gallery.service';
import { Gallery } from '@app/api/models/gallery.model';
import { GalleryItem } from '@ngx-gallery/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-landing-extra',
  templateUrl: './landing-extra.component.html',
  styleUrls: ['./landing-extra.component.scss']
})
export class LandingExtraComponent implements OnInit {
  galleryName = 'landing-bottom';
  items: GalleryItem[];
  gallery: Gallery;

  constructor(private galleryService: GalleryService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.loadGallery();
    }
  }

  private loadGallery() {
    this.galleryService.getOne(this.galleryName).subscribe(gallery => {
      this.gallery = gallery;
      this.items = this.gallery.gallery_pictures.map(picture => ({
        type: 'imageViewer',
        data: picture,
      }));
    });
  }
}
