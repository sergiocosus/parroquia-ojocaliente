import { Model } from './model';

export class User extends Model {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;



  static parseArray(objs: any[]): User[] {
    return objs.map(obj => new User().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    return this;
  }

}
