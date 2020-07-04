import { Component, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from '@app/api/services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { map, mergeMap } from 'rxjs/operators';
import { Gallery } from '@app/api/models/gallery.model';
import { GalleryLightboxComponent } from '@app/gallery/components/gallery-lightbox/gallery-lightbox.component';
import {Location} from '@angular/common';
import { RouteConstants } from '@app/api/classes/route-constants';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {
  @ViewChild(GalleryLightboxComponent, {static: false}) galleryLightbox: GalleryLightboxComponent;

  gallery: Gallery;

  constructor(private galleryService: GalleryService,
              private route: ActivatedRoute,
              private metaService: AppMetaService,
              private location: Location,
              private router: Router) {
    this.route.paramMap.pipe(
      map(params => params.get('gallerySlug')),
      mergeMap(slug => this.galleryService.getOne(slug))
    ).subscribe(gallery => {
      this.galleryLightbox.openGallery(gallery);
      this.metaService.update(
        gallery.title,
        gallery.content,
        gallery.image_url
      );
    });
  }

  ngOnInit() {
  }

  closed() {
    if (this.location.path().split('/galeria/').length > 1) {
      this.location.back();

      if (this.location.path().split('/galeria/').length > 1)  {
        this.router.navigateByUrl(RouteConstants.gallery);
      }
    }
  }
}
