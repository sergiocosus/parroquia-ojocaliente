import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from '@app/api/models/post-comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: PostComment;

  constructor() { }

  ngOnInit() {
  }

}
