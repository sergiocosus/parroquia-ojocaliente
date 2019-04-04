import { Injectable } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { User } from '@app/api/models/user.model';
import { SessionService } from '@app/api/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private ngxRolesService: NgxRolesService,
              private ngxPermissionService: NgxPermissionsService,
              private sessionService: SessionService) {
    this.sessionService.getLoggedUser().subscribe(user => {
      this.setPermissions(user);
    });
  }

  setPermissions(user: User) {
    this.ngxRolesService.flushRoles();
    this.ngxPermissionService.flushPermissions();

    if (user) {
      const permissions = [];
      user.all_permissions.forEach(
        permission => permissions.push(permission.name)
      );

      this.ngxPermissionService.loadPermissions(permissions);

      user.roles.forEach((role) => {
        this.ngxRolesService.addRole(
          role.name,
          []
        );
      });
    }
  }

  setPermissionsToGuest() {
    this.ngxRolesService.flushRoles();
    this.ngxRolesService.addRole('guest', []);
  }
}
