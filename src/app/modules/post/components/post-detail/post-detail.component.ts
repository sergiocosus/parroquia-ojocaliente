import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@app/api/models/post.model';
import { PostComment } from '@app/api/models/post-comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

  newComment(comment: PostComment) {
    this.post.comments.unshift(comment);
  }
}
