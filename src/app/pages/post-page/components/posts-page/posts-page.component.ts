import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/api/services/post.service';
import { Pagination } from '@app/api/models/pagination';
import { Post } from '@app/api/models/post.model';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  paginatedPosts: Pagination<Post>;

  constructor(private postService: PostService,
              private metaService: AppMetaService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.metaService.update(this.translate.instant('post.postsTitlePage'));
    this.postService.get().subscribe(paginatedPosts => {
      this.paginatedPosts = paginatedPosts;
    });
  }

}
