import { Component, OnInit } from '@angular/core';
import { RouteConstants } from '@app/api/classes/route-constants';

@Component({
  selector: 'app-admin-galleries-page',
  templateUrl: './admin-galleries-page.component.html',
  styleUrls: ['./admin-galleries-page.component.scss']
})
export class AdminGalleriesPageComponent implements OnInit {
  readonly newGalleryRoute = `/${RouteConstants.admin}/${RouteConstants.gallery}/${RouteConstants.new}`;

  constructor() { }

  ngOnInit() {
  }

}
