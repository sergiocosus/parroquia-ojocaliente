import { Model } from './model';
import { extract } from '@app/shared/services/i18n.service';

export class Setting extends Model {
  id: number;
  name: string;
  content: string | boolean;
  type: string;
  image_url?: string;
  image_srcset?: string;

  static parseArray(objs: any[]): Setting[] {
    return objs.map(obj => new Setting().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    if (this.type === 'boolean') {
      this.content = this.content === '1';
    }

    return this;
  }
}

export enum ValidSetting {
  title = 'title',
  showLinks = 'showLinks',
  showEvents = 'showEvents',
  showContact = 'showContact',
  contact = 'contact',
  mainPagePicture = 'mainPagePicture',
  pageIcon = 'pageIcon',
}

extract('settings.title');
extract('settings.showLinks');
extract('settings.showEvents');
extract('settings.showContact');
extract('settings.contact');
extract('settings.mainPagePicture');
extract('settings.pageIcon');
