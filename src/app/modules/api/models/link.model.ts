import { Model } from '@app/api/models/model';
import { User } from '@app/api/models/user.model';

export class Link extends Model {
  id: number;
  title: string;
  url: string;
  description: string;
  creator_user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  creator_user: User;

  static parseArray(objs: any[]): Link[] {
    return objs.map(obj => new Link().parse(obj));
  }

  parse(obj) {
    super.parse(obj);

    this.creator_user = this.creator_user ? new User().parse(this.creator_user) : null;

    return this;
  }
}
