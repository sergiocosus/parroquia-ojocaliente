import { Component, OnInit } from '@angular/core';
import { EventService } from '@app/api/services/event.service';
import { Event } from '@app/api/models/event.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-event-list',
  templateUrl: './main-event-list.component.html',
  styleUrls: ['./main-event-list.component.scss']
})
export class MainEventListComponent implements OnInit {
  events: Event[];
  formControl = new FormControl('expired');

  constructor(private eventService: EventService) {
    this.formControl.valueChanges
      .subscribe(value => {
        console.log(value);
        this.loadEvents();
      });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents() {
    const params = {};
    params[this.formControl.value] = true;
    this.eventService.get(params as any).subscribe(
      events => this.events = events
    );
  }
}
