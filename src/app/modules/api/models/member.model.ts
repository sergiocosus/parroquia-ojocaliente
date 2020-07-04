import { Model } from './model';
import { Moment } from 'moment';
import { RouteConstants } from '../classes/route-constants';

export class Member extends Model {
  id: number;
  name: string;
  image_url: string;
  image_srcset: string;
  order: number;
  created_at: Moment;
  updated_at: Moment;
  deleted_at: Moment | string;

  static parseArray(objs: any[]): Member[] {
    return objs.map(obj => new Member().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    return this;
  }

  get editUrl() {
    return `/admin/${RouteConstants.post}`;
  }
}
