import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouteConstants } from '@app/api/classes/route-constants';

@Component({
  selector: 'app-nav-pages',
  templateUrl: './nav-pages.component.html',
  styleUrls: ['./nav-pages.component.scss']
})
export class NavPagesComponent implements OnInit {
  @Output() selected = new EventEmitter();

  readonly postRoute = `/${RouteConstants.post}`;
  readonly eventRoute = `/${RouteConstants.events}`;
  readonly contactRoute = `/${RouteConstants.contact}`;

  constructor() {
  }

  ngOnInit() {
  }

}
