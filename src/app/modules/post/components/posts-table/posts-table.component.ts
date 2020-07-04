import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PostService } from '@app/api/services/post.service';
import { Post } from '@app/api/models/post.model';
import { PaginationManager } from '@app/shared/classes/pagination-manager';
import { Notify } from '@app/shared/services/notify.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns = [
    'image', 'id', 'title', 'is_published', 'categories', 'actions'
  ];

  paginationManager: PaginationManager<Post>;

  constructor(private postService: PostService,
              private notify: Notify) {
  }

  ngOnInit(): void {
    this.initPaginatorManager();
  }

  private initPaginatorManager() {
    this.paginationManager = new PaginationManager<Post>(this.sort);
    this.paginationManager.change.pipe(
      mergeMap(pd => this.postService.get(pd.pagination, pd.order, {is_published: 'false'}))
    ).subscribe(
      paginatedPeople => this.paginationManager.setPagination(paginatedPeople),
      error => this.notify.error(error)
    );
    this.paginationManager.init();
  }
}
