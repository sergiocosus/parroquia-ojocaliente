import { Model } from './model';
import { User } from '@app/api/models/user.model';
import { RouteConstants } from '@app/api/classes/route-constants';
import { Gallery } from '@app/api/models/gallery.model';

// @dynamic
export class Event extends Model {
  id: number;
  title: string;
  slug: string;
  description: string;
  description_untagged: string;
  address: string;
  begin_at: Date;
  end_at: Date;
  notify_at: Date;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  gallery_id: number;

  image_url: string;
  image_srcset: string;

  author: User;
  gallery: Gallery;

  static parseArray(objs: any[]): Event[] {
    return objs.map(obj => new Event().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    this.author = this.author ? new User().parse(this.author) : null;
    this.gallery = this.gallery ? new Gallery().parse(this.gallery) : null;
    this.description_untagged = this.description.replace(/<(?:.|\n)*?>/gm, '');

    return this;
  }


  get viewUrl() {
    return `/${RouteConstants.events}/${this.slug}`;
  }

}
