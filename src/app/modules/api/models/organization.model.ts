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

  get facebookUrl() {
    return 'http://www.facebook.com/' + this.facebook;
  }

  get instagramUrl() {
    return 'http://www.instagram.com/' + this.instagram;
  }

  get youtubeUrl() {
    return 'http://www.youtube.com/' + this.youtube;
  }

  get twitterUrl() {
    return 'http://www.twitter.com/' + this.twitter;
  }
}
