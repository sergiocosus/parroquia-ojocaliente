import { Model } from './model';
import { User } from '@app/api/models/user.model';

export class PostComment extends Model {
  id: number;
  author_user_id: number;
  post_id: number;
  content: string;
  posted_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  author: User;

  parse(obj) {
    super.parse(obj);

    this.author = this.author ? new User().parse(this.author) : null;

    return this;
  }

  static parseArray(objs: any[]): PostComment[] {
    return objs.map(obj => new PostComment().parse(obj));
  }
}
