import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { RouteConstants } from '@app/api/classes/route-constants';
import { Gallery } from '@app/api/models/gallery.model';
import { GalleryService } from '@app/api/services/gallery.service';

@Component({
  selector: 'app-admin-gallery-page',
  templateUrl: './admin-gallery-page.component.html',
  styleUrls: ['./admin-gallery-page.component.scss']
})
export class AdminGalleryPageComponent implements OnInit {
  createMode: boolean;
  gallery: Gallery;

  constructor(private route: ActivatedRoute,
              private galleryService: GalleryService) {
    this.checkRoutes();
  }

  ngOnInit() {
  }

  checkRoutes() {
    this.route.params.pipe(map(value => value['gallerySlug']))
      .subscribe(gallerySlug => {
        this.createMode = gallerySlug === RouteConstants.new;

        if (this.createMode) {
          this.gallery = null;
        } else {
          this.galleryService.getOne(gallerySlug).subscribe(gallery => {
            console.log(gallery);
            this.gallery = gallery;
          });
        }
      });
  }

}
