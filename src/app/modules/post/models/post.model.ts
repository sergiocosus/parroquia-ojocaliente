import { Model } from '@app/shared/models/model';
import { Moment } from 'moment';

export class Post extends Model {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at: Moment;

  static parseArray(objs: any[]): Post[] {
    return objs.map(obj => new Post().parse(obj));
  }

  get viewUrl() {
    return '/post/' + this.slug;
  }
}
