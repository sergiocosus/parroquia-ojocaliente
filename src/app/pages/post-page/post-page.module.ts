import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostModule } from '@app/post/post.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [PostPageComponent, PostsPageComponent],
  imports: [
    CommonModule,
    PostPageRoutingModule,
    PostModule,
    SharedModule
  ]
})
export class PostPageModule { }
