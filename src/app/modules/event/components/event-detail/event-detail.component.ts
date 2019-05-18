import { Component, Input, OnInit } from '@angular/core';
import { Event } from '@app/api/models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;

  constructor() { }

  ngOnInit() {
  }

}
