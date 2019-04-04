import { Model } from './model';
import { Permission } from '@app/api/models/permission.model';
import { Role } from '@app/api/models/role.model';

export class User extends Model {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;

  all_permissions: Permission[];
  roles: Role[];

  static parseArray(objs: any[]): User[] {
    return objs.map(obj => new User().parse(obj));
  }

  parse(obj): any {
    super.parse(obj);

    this.all_permissions = this.all_permissions ? Permission.parseArray(this.all_permissions) : null;
    this.roles = this.roles ? Role.parseArray(this.roles) : null;

    return this;
  }

}
