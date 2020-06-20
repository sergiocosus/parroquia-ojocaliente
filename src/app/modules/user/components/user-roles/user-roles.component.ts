import { Component, Input, OnInit } from '@angular/core';
import { RoleService } from '@app/api/services/role.service';
import { Role } from '@app/api/models/role.model';
import { User } from '@app/api/models/user.model';
import { FormControl } from '@angular/forms';
import { UserService } from '@app/api/services/user.service';
import { Notify } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  @Input() user: User;
  roles: Role[];

  formControl = new FormControl();

  constructor(private roleService: RoleService,
              private userService: UserService,
              private notify: Notify) {
  }

  ngOnInit() {
    this.fillRoles();
    this.roleService.get().subscribe(roles => this.roles = roles);
    this.formControl.valueChanges.subscribe(roles => this.updateUserRoles(roles));
  }

  private fillRoles() {
    this.formControl.setValue(
      this.user.roles.map(role => role.name),
      {emitEvent: false}
    );
  }

  updateUserRoles(role_names: string[]) {
    this.userService.setRoles(this.user.id, role_names).subscribe(
      roles => {
        this.user.roles = roles;
      },
      error => {
        this.notify.error(error);
        this.fillRoles();
      }
    );
  }
}
