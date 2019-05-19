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
  }

  update(title?: string, description = '', image?) {
    this.settingsService.getCachedSettings().subscribe(settings => {
      this.mainTitle = _.find(settings, {name: ValidSetting.title}).content;
      this.doUpdate(title, description, image);
    });
  }

  private doUpdate(title: string, description, image) {
    if (title) {
      title = this.translate.instant(title);
    }

    let composedTitle;
    if (title) {
      composedTitle = `${title} - ${this.mainTitle}`;
    } else {
      composedTitle = this.mainTitle;
    }

    description = description.replace(/<(?:.|\n)*?>/gm, '');

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
