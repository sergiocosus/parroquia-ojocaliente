import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

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

  mapUser() {
    return map(response => new User().parse(response['user']));
  }
}
