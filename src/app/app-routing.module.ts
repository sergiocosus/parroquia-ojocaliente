import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { RouteConstants } from '@app/api/classes/route-constants';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule)
      },
      {
        path: RouteConstants.us,
        loadChildren: () => import('./pages/us-page/us-page.module').then(m => m.UsPageModule)
      },
      {
        path: RouteConstants.argument,
        loadChildren: () => import('./pages/arguments-page/arguments-page.module').then(m => m.ArgumentsPageModule)
      },
      {
        path: RouteConstants.post,
        loadChildren: () => import('./pages/post-page/post-page.module').then(m => m.PostPageModule)
      },
      {
        path: RouteConstants.events,
        loadChildren: () => import('./pages/events-page/events-page.module').then(m => m.EventsPageModule)
      },
      {
        path: RouteConstants.category,
        loadChildren: () => import('./pages/category-page/category-page.module').then(m => m.CategoryPageModule)
      },
      {
        path: RouteConstants.link,
        loadChildren: () => import('./pages/links-page/links-page.module').then(m => m.LinksPageModule)
      },
      {
        path: RouteConstants.contact,
        loadChildren: () => import('./pages/contact-page/contact-page.module').then(m => m.ContactPageModule)
      },
      {
        path: RouteConstants.gallery,
        loadChildren: () => import('./pages/gallery-page/gallery-page.module').then(m => m.GalleryPageModule)
      },
      {
        path: RouteConstants.admin,
        loadChildren: () => import('./pages/admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
      },
      {
        path: RouteConstants.register,
        loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule)
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
