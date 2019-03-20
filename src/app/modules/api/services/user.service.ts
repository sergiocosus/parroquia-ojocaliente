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


}
