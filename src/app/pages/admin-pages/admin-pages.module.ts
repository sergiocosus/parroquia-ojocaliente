import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { NewPostPageComponent } from './components/new-post-page/new-post-page.component';
import { PostModule } from '@app/post/post.module';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { MatListModule, MatTabsModule } from '@angular/material';
import { SharedModule } from '@app/shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CategoryModule } from '@app/category/category.module';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { AdminPostsPageComponent } from './components/admin-posts-page/admin-posts-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { SettingModule } from '@app/setting/setting.module';
import { AdminLinksPageComponent } from './components/admin-links-page/admin-links-page.component';
import { LinkModule } from '@app/link/link.module';

@NgModule({
  declarations: [
    NewPostPageComponent,
    CategoriesPageComponent,
    UserProfilePageComponent,
    AdminPostsPageComponent,
    SettingsPageComponent,
    AdminLinksPageComponent,
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    PostModule,
    MatListModule,
    SharedModule,
    NgxPermissionsModule,
    CategoryModule,
    UserModule,
    AuthModule,
    MatTabsModule,
    SettingModule,
    LinkModule,
  ]
})
export class AdminPagesModule {
}
