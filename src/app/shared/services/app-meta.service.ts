import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { ValidSetting } from '@app/api/models/setting.model';
import { SettingService } from '@app/api/services/setting.service';

@Injectable({
  providedIn: 'root'
})
export class AppMetaService {
  mainTitle: string | any;

  constructor(private title: Title,
              private meta: Meta,
              private translate: TranslateService,
              private settingsService: SettingService) {
    this.settingsService.getCachedSettings().subscribe(settings => {
      this.mainTitle = _.find(settings, ['name', ValidSetting.title]).content;
    });
  }

  update(title?: string, description?: string, image?) {
    let composedTitle;
    if (title) {
      composedTitle = `${title} - ${this.mainTitle}`;
    } else {
      composedTitle = this.mainTitle;
    }

    this.title.setTitle(composedTitle);

    this.meta.updateTag({
      property: 'og:image',
      content: image
    });

    this.meta.updateTag({
      property: 'og:title',
      content: composedTitle
    });

    this.meta.updateTag({
      property: 'og:description',
      content: description,
    });

    this.meta.updateTag({
      name: 'description',
      content: description,
    });
  }
}
