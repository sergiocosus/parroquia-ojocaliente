import { Model } from './model';
import { Moment } from 'moment';
import { RouteConstants } from '../classes/route-constants';

export class Organization extends Model {
  id: number;
  name: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  phone: string;
  email: string;
  address: string;
  created_at: Moment;
  updated_at: Moment;
  deleted_at: Moment | string;

  static parseArray(objs: any[]): Organization[] {
    return objs.map(obj => new Organization().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    return this;
  }

  get editUrl() {
    return [RouteConstants.adminPages.organization, this.id];
  }
}
