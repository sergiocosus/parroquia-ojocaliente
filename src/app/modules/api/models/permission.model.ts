import { Model } from '@app/api/models/model';

export class Permission extends Model {
  id: number;
  name: string;
  display_name: string;
  description: string;

  static parseArray(objs: any[]): Permission[] {
    return objs.map(obj => new Permission().parse(obj));
  }
}

