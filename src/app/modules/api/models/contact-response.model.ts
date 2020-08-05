import { Model } from './model';
import { Moment } from 'moment';
import { RouteConstants } from '../classes/route-constants';

export class ContactResponse extends Model {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  created_at: Moment;
  updated_at: Moment;
  deleted_at: Moment | string;

  static parseArray(objs: any[]): ContactResponse[] {
    return objs.map(obj => new ContactResponse().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    return this;
  }

  get editUrl() {
    return [RouteConstants.adminPages.contact, this.id];
  }
}
