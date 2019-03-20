import { Model } from './model';
import { Moment } from 'moment';

export class PostComment extends Model {
  id: number;
  author_user_id: number;
  post_id: number;
  content: string;
  posted_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;


  static parseArray(objs: any[]): PostComment[] {
    return objs.map(obj => new PostComment().parse(obj));
  }
}
