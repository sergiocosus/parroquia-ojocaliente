import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GalleryService } from '@app/api/services/gallery.service';
import { Gallery } from '@app/api/models/gallery.model';
import { Pagination } from '@app/api/models/pagination';
import { RouteConstants } from '@app/api/classes/route-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { GalleryThumbComponent } from '@app/gallery/components/gallery-thumb/gallery-thumb.component';
import { Lightbox } from '@ngx-gallery/lightbox';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit, AfterViewInit {
  @ViewChildren(GalleryThumbComponent) galleriesThumb: QueryList<GalleryThumbComponent>;
  galleryPagination: Pagination<Gallery>;
  readonly newGalleryRoute = `/${RouteConstants.admin}/${RouteConstants.gallery}/${RouteConstants.new}`;
  private slug: string;

  constructor(private galleryService: GalleryService,
              private route: ActivatedRoute,
              private lightbox: Lightbox,
              private router: Router,
              private metaService: AppMetaService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.galleryService.get().subscribe(galleryPagination => {
      this.galleryPagination = galleryPagination;
    });

    this.lightbox.closed.subscribe(a => {
      this.router.navigateByUrl(RouteConstants.gallery);
    });
  }

  ngAfterViewInit(): void {
    merge(
      this.galleriesThumb.changes,
      this.route.paramMap
        .pipe(map(params => this.slug = params.get('g')))
    ).subscribe(slug => {
      const galleryThumbComponent = _.find(this.galleriesThumb.toArray(),
        {gallery: {slug: this.slug}}) as GalleryThumbComponent;

      if (galleryThumbComponent) {
        galleryThumbComponent.openGallery();

        this.metaService.update(
          galleryThumbComponent.gallery.title,
          galleryThumbComponent.gallery.content,
          galleryThumbComponent.gallery.image_url
        );
      } else {
        this.metaService.update(this.translate.instant('gallery.galleries'));
      }
    });
  }
}
