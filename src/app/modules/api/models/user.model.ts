import { Model } from './model';
import { Permission } from '@app/api/models/permission.model';
import { Role } from '@app/api/models/role.model';
import * as _ from 'lodash';

export class User extends Model {
  id: number;
  name: string;
  last_name: string;
  email: string;
  updated_at: string;
  created_at: string;

  profile_srcset: string;

  all_permissions: Permission[];
  roles: Role[];

  static parseArray(objs: any[]): User[] {
    return objs.map(obj => new User().parse(obj));
  }

  can(name) {
    return _.find(this.all_permissions, {name});
  }

  parse(obj): any {
    super.parse(obj);

    this.all_permissions = this.all_permissions ? Permission.parseArray(this.all_permissions) : null;
    this.roles = this.roles ? Role.parseArray(this.roles) : null;

    return this;
  }

  get full_name() {
    return `${this.name} ${this.last_name}`;
  }

}
