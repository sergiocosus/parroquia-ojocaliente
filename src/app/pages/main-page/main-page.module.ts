import { NgModule } from '@angular/core';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PostModule } from '@app/post/post.module';
import { SharedModule } from '@app/shared/shared.module';
import { AdsenseModule } from 'ng2-adsense';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ElementsModule } from '@app/elements/elements.module';
import { LandingExtraComponent } from './components/landing-extra/landing-extra.component';
import { GalleryModule } from '@ngx-gallery/core';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [MainPageComponent, LandingPageComponent, LandingExtraComponent],
  imports: [
    SharedModule,
    MainPageRoutingModule,
    PostModule,
    AdsenseModule,
    ShareButtonsModule,
    ElementsModule,
    GalleryModule,
    PinchZoomModule
  ]
})
export class MainPageModule {
}
