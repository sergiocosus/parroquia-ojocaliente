import { NgModule } from '@angular/core';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PostModule } from '@app/post/post.module';
import { SharedModule } from '@app/shared/shared.module';
import { AdsenseModule } from 'ng2-adsense';
import { GalleryModule } from '@app/gallery/gallery.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    SharedModule,
    MainPageRoutingModule,
    PostModule,
    AdsenseModule,
    GalleryModule
  ]
})
export class MainPageModule { }
