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
    return this.httpClient.get('post').pipe(
      map(response => new Pagination().parse(response['paginated_posts']).parseData(Post))
    );
  }

  getOne() {
    return this.httpClient.get('post/${post_id}').pipe(
      map(response => new Post().parse(response['post']))
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
      map(response => new Post().parse(response['post']))
    );
  }

  put(post_id: number, params: {
    title: string,
    content: string,
    posted_at: string,
    user_author_id: number,
    thumbnail: {
      name: string,
      base64: string,
    }
  }) {
    return this.httpClient.post(`post/${post_id}`, params).pipe(
      map(response => Post.parseArray(response['posts']))
    );
  }

  delete(post_id: number) {
    return this.httpClient.delete(`post/${post_id}`);
  }
}
