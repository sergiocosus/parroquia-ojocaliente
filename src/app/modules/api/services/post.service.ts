import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Pagination } from '@app/api/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient.get('post').pipe(this.mapPostPaginated());
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
