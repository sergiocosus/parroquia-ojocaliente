import { Component, OnInit } from '@angular/core';
import { RouteConstants } from '@app/api/classes/route-constants';

@Component({
  selector: 'app-admin-posts-page',
  templateUrl: './admin-posts-page.component.html',
  styleUrls: ['./admin-posts-page.component.scss']
})
export class AdminPostsPageComponent implements OnInit {
  readonly newPostRoute = `/${RouteConstants.admin}/${RouteConstants.post}/${RouteConstants.new}`;

  constructor() { }

  ngOnInit() {
  }

}
