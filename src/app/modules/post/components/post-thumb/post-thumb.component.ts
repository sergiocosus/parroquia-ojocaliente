import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@app/post/models/post.model';
import * as moment from 'moment';

@Component({
  selector: 'app-post-thumb',
  templateUrl: './post-thumb.component.html',
  styleUrls: ['./post-thumb.component.scss']
})
export class PostThumbComponent implements OnInit {
  @Input() post = new Post().parse({
    title: 'Nuevo post',
    slug: 'nuevo-post',
    image_url: 'https://s3.us-west-2.amazonaws.com/calvillo.com.mx/images/picture/5959b307f273f_xlg',
    created_at: moment(),
  });
  constructor() { }

  ngOnInit() {
  }

}
