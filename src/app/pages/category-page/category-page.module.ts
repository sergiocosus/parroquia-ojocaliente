import { NgModule } from '@angular/core';

import { CategoryPageRoutingModule } from './category-page-routing.module';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { PostModule } from '@app/post/post.module';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  declarations: [CategoryPageComponent],
  imports: [
    SharedModule,
    CategoryPageRoutingModule,
    PostModule,
    ShareButtonsModule
  ]
})
export class CategoryPageModule { }
