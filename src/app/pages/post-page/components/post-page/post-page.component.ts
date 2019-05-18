import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '@app/api/models/post.model';
import { PostService } from '@app/api/services/post.service';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  postSlug: string;
  post: Post;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postService: PostService,
              private metaService: AppMetaService) {
    this.route.paramMap.pipe(
      map(params => this.postSlug = params.get('postSlug')),
      mergeMap(postSlug => this.postService.getOne(postSlug))
    ).subscribe(post => {
        this.post = post;
        this.metaService.update(
          this.post.title,
          this.post.content,
          this.post.image_url
        );
      },
      error => this.router.navigateByUrl('/'));
  }

  ngOnInit() {
  }

}
