import { Component, Input, OnInit } from '@angular/core';
import { Gallery } from '@app/api/models/gallery.model';

@Component({
  selector: 'app-gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.scss']
})
export class GalleryThumbComponent implements OnInit {
  @Input() gallery: Gallery;

  constructor() {
  }

  ngOnInit() {
  }

}
