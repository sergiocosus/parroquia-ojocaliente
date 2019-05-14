import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@app/api/models/post.model';

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss']
})
export class PostCategoriesComponent implements OnInit {
  @Input() post: Post;
  constructor() { }

  ngOnInit() {
  }

}
