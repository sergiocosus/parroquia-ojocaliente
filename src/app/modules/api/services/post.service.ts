import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Pagination } from '@app/api/models/pagination';
import { PaginationService } from '@app/api/services/pagination.service';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  get(pagination?: PaginationInfo, order?: OrderInfo, filters?: any) {
    const params = this.paginationService.createHttpParams(pagination, order, filters);
    return this.httpClient.get('post', {params})
      .pipe(this.mapPostPaginated());
  }

  getOne(slug: string) {
    return this.httpClient.get(`post/${slug}`).pipe(
      this.mapPost()
    );
  }

  post(params: {
    title: string,
    content: string,
    posted_at: string,
    user_author_id: number,
    thumbnail: {
      name: string,
      base64: string,
    }
  }) {
    return this.httpClient.post('post', params).pipe(
      this.mapPost()
    );
  }

  edit(slug: string, params: {
    title: string,
    content: string,
    posted_at: string,
    user_author_id: number,
    thumbnail: {
      name: string,
      base64: string,
    }
  }) {
    return this.httpClient.put(`post/${slug}`, params).pipe(
      this.mapPost()
    );
  }

  delete(post_id: number) {
    return this.httpClient.delete(`post/${post_id}`);
  }

  private mapPostPaginated() {
    return map(response => new Pagination().parse(response['paginated_posts'])
      .parseData(Post) as Pagination<Post>);
  }

  private mapPost() {
    return map(response => new Post().parse(response['post']));
  }
}
