import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppMetaService {
  readonly mainTitle: string | any;

  constructor(private title: Title,
              private meta: Meta,
              private translate: TranslateService) {
    this.mainTitle = this.translate.instant('page.title');
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
