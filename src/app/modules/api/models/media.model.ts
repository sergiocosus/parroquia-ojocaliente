import { Model } from './model';
import { Post } from '@app/api/models/post.model';

export class Media extends Model {
  id: number;
  url: string;
  srcset: string;
  name: string;

  static parseArray(objs: any[]): Media[] {
    return objs.map(obj => new Media().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    return this;
  }
}
