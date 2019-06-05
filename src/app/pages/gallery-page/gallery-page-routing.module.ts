import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryPageComponent,
    children: [
      {
        path: ':galleryPageSlug',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryPageRoutingModule { }
