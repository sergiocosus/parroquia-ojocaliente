import { Component, OnInit } from '@angular/core';
import { GalleryService } from '@app/api/services/gallery.service';
import { Gallery } from '@app/api/models/gallery.model';
import { GalleryItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-landing-extra',
  templateUrl: './landing-extra.component.html',
  styleUrls: ['./landing-extra.component.scss']
})
export class LandingExtraComponent implements OnInit {
  galleryName = 'landing-bottom';
  items: GalleryItem[];
  gallery: Gallery;

  constructor(private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.galleryService.getOne(this.galleryName).subscribe(gallery => {
      this.gallery = gallery;
      this.items = this.gallery.gallery_pictures.map(picture => ({
        type: 'imageViewer',
        data: picture,
      }));
    });
  }

}
