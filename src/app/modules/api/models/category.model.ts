import { Model } from './model';
import { Post } from '@app/api/models/post.model';
import { RouteConstants } from '@app/api/classes/route-constants';
import { Link } from '@app/api/models/link.model';

export class Category extends Model {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  posts: Post[];
  links: Link[];

  static parseArray(objs: any[]): Category[] {
    return objs.map(obj => new Category().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);
    this.posts = this.posts ? Post.parseArray(this.posts) : null;
    this.links = this.links ? Link.parseArray(this.links) : null;

    return this;
  }

  get viewUrl() {
    return `/${RouteConstants.category}/${this.slug}`;
  }
}
