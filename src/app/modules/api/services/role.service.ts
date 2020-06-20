import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Role } from '@app/api/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) {

  }

  get() {
    return this.httpClient.get(`security/role`).pipe(this.mapRoles());
  }

  mapRoles() {
    return map(response => Role.parseArray(response['roles']));
  }
}
