import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@app/api/models/post.model';
import * as moment from 'moment';

@Component({
  selector: 'app-post-thumb',
  templateUrl: './post-thumb.component.html',
  styleUrls: ['./post-thumb.component.scss']
})
export class PostThumbComponent implements OnInit {
  @Input() post;

  constructor() { }

  ngOnInit() {
  }

}
