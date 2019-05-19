import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '@app/api/services/event.service';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Event } from '@app/api/models/event.model';
import { AppMetaService } from '@app/shared/services/app-meta.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  event: Event;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private appMetaService: AppMetaService) {
    this.loadEvent();
  }

  private loadEvent() {
    this.route.paramMap.pipe(
      map(params => params.get('event_slug')),
      tap(() => this.loading = true),
      mergeMap(eventSlug => this.eventService.getOne(eventSlug).pipe(
        finalize(() => this.loading = false)
      ))
    ).subscribe(event => {
      this.event = event;
      this.appMetaService.update(event.title, event.description, event.image_url);
    });
  }

  ngOnInit() {
  }

}
