import { Model } from './model';
import { Moment } from 'moment';
import { User } from '../models/user.model';
import { RouteConstants } from '../classes/route-constants';
import { GalleryPicture } from '@app/api/models/gallery-picture.model';

export class Gallery extends Model {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: Moment;
  updated_at: Moment;
  deleted_at: string;

  image_url: string;
  image_srcset: string;

  gallery_pictures: GalleryPicture[];
  author: User;

  static parseArray(objs: any[]): Gallery[] {
    return objs.map(obj => new Gallery().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    this.gallery_pictures = this.gallery_pictures ? GalleryPicture.parseArray(this.gallery_pictures) : null;
    this.author = this.author ? new User().parse(this.author) : null;

    return this;
  }

  get viewUrl() {
    return [`/${RouteConstants.gallery}`, {g: this.slug}];
  }

  get editUrl() {
    return `/admin/${RouteConstants.gallery}/${this.slug}`;
  }
}
