import { Model } from './model';
import { User } from '@app/api/models/user.model';
import { RouteConstants } from '@app/api/classes/route-constants';

// @dynamic
export class Event extends Model {
  id: number;
  title: string;
  slug: string;
  description: string;
  address: string;
  begin_at: Date;
  end_at: Date;
  notify_at: Date;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  image_url: string;
  image_srcset: string;

  author: User;

  static parseArray(objs: any[]): Event[] {
    return objs.map(obj => new Event().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    this.author = this.author ? new User().parse(this.author) : null;

    return this;
  }


  get viewUrl() {
    return `/${RouteConstants.events}/${this.slug}`;
  }

}
