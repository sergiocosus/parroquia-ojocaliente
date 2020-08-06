import { Model } from './model';
import { Moment } from 'moment';
import { User } from '../models/user.model';
import { RouteConstants } from '../classes/route-constants';

export class GalleryPicture extends Model {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: Moment;
  image_url: string;
  image_srcset: string;
  author: User;

  file?: File;

  static parseArray(objs: any[]): GalleryPicture[] {
    return objs.map(obj => new GalleryPicture().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);
    this.author = this.author ? new User().parse(this.author) : null;

    return this;
  }

  get viewUrlParam() {
    return {picture: this.slug};
  }

  get editUrl() {
    return `/admin/${RouteConstants.gallery}/${this.slug}`;
  }
}
