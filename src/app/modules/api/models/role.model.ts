import { Model } from '@app/api/models/model';

export class Role extends Model {
  id: number;
  name: string;
  display_name: string;
  description: string;

  static parseArray(objs: any[]): Role[] {
    return objs.map(obj => new Role().parse(obj));
  }

  parse(obj) {
    super.parse(obj);

    return this;
  }
}
