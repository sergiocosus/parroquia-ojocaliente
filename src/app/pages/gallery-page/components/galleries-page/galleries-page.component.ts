import { Component, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from '@app/api/services/gallery.service';
import { Gallery } from '@app/api/models/gallery.model';
import { Pagination } from '@app/api/models/pagination';
import { RouteConstants } from '@app/api/classes/route-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Lightbox } from '@ngx-gallery/lightbox';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { TranslateService } from '@ngx-translate/core';
import { GalleryLightboxComponent } from '@app/gallery/components/gallery-lightbox/gallery-lightbox.component';

@Component({
  selector: 'app-galleries-page',
  templateUrl: './galleries-page.component.html',
  styleUrls: ['./galleries-page.component.scss']
})
export class GalleriesPageComponent implements OnInit {
  @ViewChild(GalleryLightboxComponent, {static: true}) galleryLightbox: GalleryLightboxComponent;
  galleryPagination: Pagination<Gallery>;
  readonly newGalleryRoute = `/${RouteConstants.admin}/${RouteConstants.gallery}/${RouteConstants.new}`;

  constructor(private galleryService: GalleryService,
              private route: ActivatedRoute,
              private lightbox: Lightbox,
              private router: Router,
              private metaService: AppMetaService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.metaService.update(this.translate.instant('gallery.galleries'));

    this.galleryService.getPaginated().pipe(tap(galleryPagination => {
      this.galleryPagination = galleryPagination;
    })).subscribe();
  }

}
