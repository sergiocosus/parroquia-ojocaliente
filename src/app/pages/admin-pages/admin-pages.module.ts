import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { NewPostPageComponent } from './components/new-post-page/new-post-page.component';
import { PostModule } from '@app/post/post.module';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { MatListModule } from '@angular/material';
import { SharedModule } from '@app/shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CategoryModule } from '@app/category/category.module';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { UserModule } from '@app/user/user.module';

@NgModule({
  declarations: [NewPostPageComponent, CategoriesPageComponent, UserProfilePageComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    PostModule,
    MatListModule,
    SharedModule,
    NgxPermissionsModule,
    CategoryModule,
    UserModule,
  ]
})
export class AdminPagesModule { }
