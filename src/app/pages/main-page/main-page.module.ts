import { NgModule } from '@angular/core';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PostModule } from '@app/post/post.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    SharedModule,
    MainPageRoutingModule,
    PostModule
  ]
})
export class MainPageModule { }
