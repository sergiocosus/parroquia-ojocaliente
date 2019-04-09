import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostComment } from '../models/post-comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  constructor(private httpClient: HttpClient) {
  }

  store(post_slug: string, body: {
    content
  }) {
    return this.httpClient.post(`post/${post_slug}/comment`, body).pipe(
      map(response => new PostComment().parse(response['comment']))
    );
  }

  delete(comment_id: number) {
    return this.httpClient.delete(`post/comment/${comment_id}`);
  }
}
