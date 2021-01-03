import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GalleryService } from '@app/api/services/gallery.service';
import { Gallery } from '@app/api/models/gallery.model';
import { GalleryItem } from '@ngx-gallery/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SettingService } from '@app/api/services/setting.service';
import { ValidSetting } from '@app/api/models/setting.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrganizationService } from '@app/api/services/organization.service';

@Component({
  selector: 'app-landing-extra',
  templateUrl: './landing-extra.component.html',
  styleUrls: ['./landing-extra.component.scss']
})
export class LandingExtraComponent implements OnInit {
  galleryName = 'landing-bottom';
  gallery: Gallery;
  $pageIconSrcSet: Observable<string | boolean>;
  $organization: Observable<any>;

  constructor(private galleryService: GalleryService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private settingService: SettingService,
              private organizationService: OrganizationService) {
    this.$pageIconSrcSet = this.settingService.getCachedSetting(ValidSetting.pageIcon)
      .pipe(map(setting => setting.image_srcset));
    this.$organization = this.organizationService.getOne('juvi-nacional');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.loadGallery();
    }
  }

  private loadGallery() {
    this.galleryService.getOne(this.galleryName).subscribe(gallery => {
      this.gallery = gallery;
    });
  }
}
