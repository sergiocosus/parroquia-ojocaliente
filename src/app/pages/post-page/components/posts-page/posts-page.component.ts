import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/api/services/post.service';
import { Pagination } from '@app/api/models/pagination';
import { Post } from '@app/api/models/post.model';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  paginatedPosts: Pagination<Post>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.get().subscribe(paginatedPosts => {
      this.paginatedPosts = paginatedPosts;
    });
  }

}
