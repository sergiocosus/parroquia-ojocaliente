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
        loadChildren: './pages/main-page/main-page.module#MainPageModule'
      },
      {
        path: RouteConstants.post,
        loadChildren: './pages/post-page/post-page.module#PostPageModule'
      },
      {
        path: RouteConstants.category,
        loadChildren: './pages/category-page/category-page.module#CategoryPageModule'
      },
      {
        path: RouteConstants.link,
        loadChildren: './pages/links-page/links-page.module#LinksPageModule'
      },
      {
        path: RouteConstants.contact,
        loadChildren: './pages/contact-page/contact-page.module#ContactPageModule'
      },
      {
        path: RouteConstants.admin,
        loadChildren: './pages/admin-pages/admin-pages.module#AdminPagesModule'
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
