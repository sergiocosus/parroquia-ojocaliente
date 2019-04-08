import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@app/api/services/post.service';
import { map } from 'rxjs/operators';
import { Post } from '@app/api/models/post.model';
import { RouteConstants } from '@app/api/classes/route-constants';

@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.scss']
})
export class NewPostPageComponent implements OnInit {
  createMode: boolean;
  post: Post;

  constructor(private route: ActivatedRoute,
              private postService: PostService) {
    this.checkRoutes();
  }

  ngOnInit() {
  }

  checkRoutes() {
    this.route.params.pipe(map(value => value['postSlug']))
      .subscribe(postSlug => {
        this.createMode = postSlug === RouteConstants.new;

        if (this.createMode) {
          this.post = null;
        } else {
          this.postService.getOne(postSlug).subscribe(post => {
            this.post = post;
          });
        }
      });
  }
}
