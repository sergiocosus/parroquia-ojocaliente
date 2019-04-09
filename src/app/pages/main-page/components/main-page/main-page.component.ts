import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/api/services/post.service';
import { Post } from '@app/api/models/post.model';
import { CategoryService } from '@app/api/services/category.service';
import { Category } from '@app/api/models/category.model';
import { AppMetaService } from '@app/shared/services/app-meta.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  posts: Post[];
  categories: Category[];

  constructor(private postService: PostService,
              private categoryService: CategoryService,
              private metaService: AppMetaService) { }

  ngOnInit() {
    this.metaService.update();

    this.postService.get().subscribe(paginatedPosts => {
      this.posts = paginatedPosts.data;
    });

    this.categoryService.get().subscribe(
      categories => this.categories = categories
    );
  }

}
