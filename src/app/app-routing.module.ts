import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';

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
        path: 'post',
        loadChildren: './pages/post-page/post-page.module#PostPageModule'
      },
      {
        path: 'links',
        loadChildren: './pages/links-page/links-page.module#LinksPageModule'
      },
      {
        path: 'contact',
        loadChildren: './pages/contact-page/contact-page.module#ContactPageModule'
      },
      {
        path: 'admin',
        loadChildren: './pages/admin-pages/admin-pages.module#AdminPagesModule'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
