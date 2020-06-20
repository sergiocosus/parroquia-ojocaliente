import { NgModule } from '@angular/core';
import { UserImageComponent } from '@app/user/components/user-image/user-image.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MatProgressBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { UserRolesComponent } from './components/user-roles/user-roles.component';

@NgModule({
  declarations: [
    UserImageComponent,
    UserFormComponent,
    UsersTableComponent,
    UserRolesComponent,
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
  ],
  exports: [
    UserImageComponent,
    UserFormComponent,
    UsersTableComponent,
  ]
})
export class UserModule {
}
