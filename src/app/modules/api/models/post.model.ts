import { Model } from './model';
import { Moment } from 'moment';
import { PostComment } from './post-comment.model';

export class Post extends Model {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at: Moment;

  comments: PostComment[];

  static parseArray(objs: any[]): Post[] {
    return objs.map(obj => new Post().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    this.comments = this.comments ? PostComment.parseArray(this.comments) : null;

    return this;
  }

  get viewUrl() {
    return '/post/' + this.slug;
  }
}
