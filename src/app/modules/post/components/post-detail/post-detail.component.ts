import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@app/api/models/post.model';
import { PostComment } from '@app/api/models/post-comment.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;

  fixedContent: SafeHtml;

  constructor(private dom: DomSanitizer) {
  }

  ngOnInit() {
    this.fixedContent = this.dom.bypassSecurityTrustHtml(this.post.content);
  }

  newComment(comment: PostComment) {
    this.post.comments.unshift(comment);
  }
}
