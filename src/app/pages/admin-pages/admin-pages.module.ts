import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { NewPostPageComponent } from './components/new-post-page/new-post-page.component';
import { PostModule } from '@app/post/post.module';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { AdminGalleryPageComponent } from './components/admin-gallery-page/admin-gallery-page.component';
import { GalleryModule } from '@app/gallery/gallery.module';
import { AdminGalleriesPageComponent } from './components/admin-galleries-page/admin-galleries-page.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MemberModule } from '@app/member/member.module';
import { AdminArgumentPageComponent } from './components/admin-argument-page/admin-argument-page.component';
import { ArgumentModule } from '@app/argument/argument.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminOrganizationsPageComponent } from './components/admin-organizations-page/admin-organizations-page.component';
import { OrganizationModule } from '../../modules/organization/organization.module';

@NgModule({
  declarations: [
    NewPostPageComponent,
    CategoriesPageComponent,
    UserProfilePageComponent,
    AdminPostsPageComponent,
    SettingsPageComponent,
    AdminLinksPageComponent,
    AdminGalleryPageComponent,
    AdminGalleriesPageComponent,
    AdminNavComponent,
    UsersPageComponent,
    MembersPageComponent,
    AdminArgumentPageComponent,
    AdminOrganizationsPageComponent,
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
        GalleryModule,
        MemberModule,
        ArgumentModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatExpansionModule,
        DragDropModule,
        OrganizationModule,
    ]
})
export class AdminPagesModule {
}
