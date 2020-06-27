import { Model } from './model';
import { Moment } from 'moment';
import { RouteConstants } from '../classes/route-constants';

export class Argument extends Model {
  id: number;
  answer: string;
  question: string;
  order: number;
  created_at: Moment;
  updated_at: Moment;
  deleted_at: Moment | string;

  static parseArray(objs: any[]): Argument[] {
    return objs.map(obj => new Argument().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    return this;
  }

  get editUrl() {
    return `/admin/${RouteConstants.argument}/${this.id}`;
  }
}
