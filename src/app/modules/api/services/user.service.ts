import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { PaginationService } from '@app/api/services/pagination.service';
import { Pagination } from '@app/api/models/pagination';
import { Role } from '@app/api/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private paginationService: PaginationService) {

  }

  get(pagination?: PaginationInfo, order?: OrderInfo, filters?: any) {
    const params = this.paginationService.createHttpParams(pagination, order, filters);
    return this.http.get(`user`, {params})
      .pipe(this.mapUserPaginated());
  }

  getMe() {
    return this.http.get('user/me').pipe(
      map(json => {
        return {
          user: new User().parse(json['user']),
          impersonator_user: json['impersonator_user'] ? new User().parse(json['impersonator_user']) : null
        };
      }));
  }

  putMe(data: {
    name: string,
    last_name: string,
    profile: {
      name: string,
      base64: string,
    },
  }) {
    return this.http.put(`user/me`, data).pipe(this.mapUser());
  }

  changePassword(data: {
    current_password: string,
    password: string,
    password_confirmation: string
  }) {
    return this.http.put('auth/password', data);
  }

  setRoles(user_id: number, role_names: string[]) {
    return this.http.put(`user/${user_id}/roles`, {role_names})
      .pipe(this.mapRoles());
  }

  mapUser() {
    return map(response => new User().parse(response['user']));
  }

  mapUsers() {
    return map(response => User.parseArray(response['users']));
  }

  private mapUserPaginated() {
    return map(response => new Pagination().parse(response['paginated_users'])
      .parseData(User) as Pagination<User>);
  }

  private mapRoles() {
    return map(response => Role.parseArray(response['roles']));
  }
}
