import { Model } from './model';
import { Moment } from 'moment';
import { PostComment } from './post-comment.model';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { RouteConstants } from '../classes/route-constants';

export class Post extends Model {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  image_srcset: string;
  is_published: boolean;
  created_at: Moment;

  comments: PostComment[];
  categories: Category[];
  author: User;

  static parseArray(objs: any[]): Post[] {
    return objs.map(obj => new Post().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    this.comments = this.comments ? PostComment.parseArray(this.comments) : null;
    this.categories = this.categories ? Category.parseArray(this.categories) : null;
    this.author = this.author ? new User().parse(this.author) : null;

    return this;
  }

  get viewUrl() {
    return `/${RouteConstants.post}/${this.slug}`;
  }

  get editUrl() {
    return `/admin/${RouteConstants.post}/${this.slug}`;
  }
}
