import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@app/api/models/post.model';
import * as moment from 'moment';
import { PostService } from '@app/api/services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  postSlug: string;
  post: Post;

  constructor(private route: ActivatedRoute,
              private postService: PostService) {
    this.route.paramMap.subscribe(params => {
      this.postSlug = params.get('postSlug');
      this.postService.getOne(this.postSlug).subscribe(post => {
        this.post = post;
      });
    });
  }

  ngOnInit() {
  }

}
