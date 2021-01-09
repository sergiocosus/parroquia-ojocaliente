import { Model } from './model';
import { Moment } from 'moment';
import { RouteConstants } from '../classes/route-constants';
import { Organization } from '@app/api/models/organization.model';

export class Member extends Model {
  id: number;
  name: string;
  image_url: string;
  image_srcset: string;
  order: number;
  description: string;
  organization_id: number;
  organization: Organization;
  created_at: Moment;
  updated_at: Moment;
  deleted_at: Moment | string;

  static parseArray(objs: any[]): Member[] {
    return objs.map(obj => new Member().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    this.organization = this.organization ? new Organization().parse(this.organization) : null;

    return this;
  }

  get editUrl() {
    return `/admin/${RouteConstants.member}`;
  }
}
