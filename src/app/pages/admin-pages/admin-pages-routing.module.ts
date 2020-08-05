import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostPageComponent } from './components/new-post-page/new-post-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { RouteConstants } from '@app/api/classes/route-constants';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { AdminPostsPageComponent } from './components/admin-posts-page/admin-posts-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { AdminLinksPageComponent } from './components/admin-links-page/admin-links-page.component';
import { AdminGalleryPageComponent } from './components/admin-gallery-page/admin-gallery-page.component';
import { AdminGalleriesPageComponent } from './components/admin-galleries-page/admin-galleries-page.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { AdminArgumentPageComponent } from './components/admin-argument-page/admin-argument-page.component';
import { AdminOrganizationsPageComponent } from './components/admin-organizations-page/admin-organizations-page.component';
import { AdminContactPageComponent } from './components/admin-contact-page/admin-contact-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminNavComponent,
    children: [
      {
        path: `${RouteConstants.post}`,
        component: AdminPostsPageComponent
      },
      {
        path: `${RouteConstants.settings}`,
        component: SettingsPageComponent
      },
      {
        path: `${RouteConstants.post}/:postSlug`,
        component: NewPostPageComponent
      },
      {
        path: `${RouteConstants.gallery}`,
        component: AdminGalleriesPageComponent
      },
      {
        path: `${RouteConstants.gallery}/:gallerySlug`,
        component: AdminGalleryPageComponent
      },
      {
        path: RouteConstants.category,
        component: CategoriesPageComponent
      },
      {
        path: `${RouteConstants.profile}`,
        component: UserProfilePageComponent,
      },
      {
        path: `${RouteConstants.link}`,
        component: AdminLinksPageComponent,
      },
      {
        path: `${RouteConstants.user}`,
        component: UsersPageComponent,
      },
      {
        path: `${RouteConstants.member}`,
        component: MembersPageComponent,
      },
      {
        path: `${RouteConstants.argument}`,
        component: AdminArgumentPageComponent,
      },
      {
        path: `${RouteConstants.organization}`,
        component: AdminOrganizationsPageComponent,
      },
      {
        path: `${RouteConstants.contact}`,
        component: AdminContactPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {
}
