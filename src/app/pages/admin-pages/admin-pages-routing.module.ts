import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPostPageComponent } from './components/new-post-page/new-post-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { RouteConstants } from '@app/api/classes/route-constants';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { AdminPostsPageComponent } from './components/admin-posts-page/admin-posts-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { AdminLinksPageComponent } from './components/admin-links-page/admin-links-page.component';
import { AdminGalleryPageComponent } from './components/admin-gallery-page/admin-gallery-page.component';
import { AdminGalleriesPageComponent } from './components/admin-galleries-page/admin-galleries-page.component';

const routes: Routes = [
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
    path: `${RouteConstants.user}`,
    component: UserProfilePageComponent,
  },
  {
    path: `${RouteConstants.link}`,
    component: AdminLinksPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
