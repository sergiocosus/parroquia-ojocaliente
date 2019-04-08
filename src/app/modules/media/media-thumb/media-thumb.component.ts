import { Component, Input, OnInit } from '@angular/core';
import { Media } from '@app/api/models/media.model';

@Component({
  selector: 'app-media-thumb',
  templateUrl: './media-thumb.component.html',
  styleUrls: ['./media-thumb.component.scss']
})
export class MediaThumbComponent implements OnInit {
  @Input() media: Media;

  constructor() { }

  ngOnInit() {
  }

}
