import { Model } from './model';
import { extract } from '@app/shared/services/i18n.service';

export class Setting extends Model {
  id: number;
  name: string;
  content: string;
  type: string;

  static parseArray(objs: any[]): Setting[] {
    return objs.map(obj => new Setting().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    return this;
  }
}

export enum ValidSetting {
  title = 'title',
}

extract('settings.title');
