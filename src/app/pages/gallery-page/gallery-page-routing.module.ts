import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleriesPageComponent } from './components/galleries-page/galleries-page.component';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';

const routes: Routes = [
  {
    path: '',
    component: GalleriesPageComponent,
  },
  {
    path: ':gallerySlug',
    component: GalleryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryPageRoutingModule {
}
