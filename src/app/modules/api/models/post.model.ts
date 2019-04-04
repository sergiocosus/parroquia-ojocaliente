import { Model } from './model';
import { Moment } from 'moment';
import { PostComment } from './post-comment.model';
import { Category } from '@app/api/models/category.model';
import { User } from '@app/api/models/user.model';

export class Post extends Model {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  image_srcset: string;
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
    return '/post/' + this.slug;
  }

  get editUrl() {
    return '/admin/post/' + this.slug;
  }
}
