import { Model } from './model';
import { Post } from '@app/api/models/post.model';

export class Category extends Model {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  posts: Post[];

  static parseArray(objs: any[]): Category[] {
    return objs.map(obj => new Category().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);
    this.posts = this.posts ? Post.parseArray(this.posts) : null;

    return this;
  }

  get viewUrl() {
    return '/category/' + this.slug;
  }
}
