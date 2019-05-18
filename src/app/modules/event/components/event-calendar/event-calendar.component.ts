import { Component, OnInit } from '@angular/core';
import { Event } from '@app/api/models/event.model';
import { User } from '@app/api/models/user.model';
import { EventService } from '@app/api/services/event.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SessionService } from '@app/api/services/session.service';
import { EventEditDialogComponent } from '@app/event/components/event-edit-dialog/event-edit-dialog.component';
import { filter } from 'rxjs/operators';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  view = 'month';

  viewDate: Date = new Date();

  activeDayIsOpen = false;
  events: Event[];
  calendarEvents: CalendarEvent<Event>[];

  locale = 'es-MX';

  actions: CalendarEventAction[] = [
    {
      label: '<i class="calendar-icon fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.edit(event.meta);
      },
    }
  ];

  user: User;

  constructor(private eventService: EventService,
              private dialog: MatDialog,
              private router: Router,
              private sessionService: SessionService) {

    this.sessionService.getLoggedUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.eventService.get().subscribe(events => {
      this.events = events;
      this.calendarEvents = events.map(this.createCalendarEvent.bind(this));
    });
  }

  createCalendarEvent(event: Event) {
    return {
      title: event.title,
      start: new Date(event.begin_at),
      end: new Date(event.end_at),
      color: colors.main,
      meta: event,
      actions: this.user ? this.actions : [],
    };
  }

  create() {
    this.dialog.open(EventEditDialogComponent).afterClosed()
      .pipe(filter(Boolean)).subscribe(
      event => {
        this.calendarEvents.push(this.createCalendarEvent(event));
      }
    );
  }

  edit(event: Event) {
    this.dialog.open(EventEditDialogComponent, {data: event}).afterClosed()
      .pipe(filter(Boolean)).subscribe(
      eventUpdated => {
        event.replaceProperties(eventUpdated);
        this.calendarEvents = this.events.map(this.createCalendarEvent.bind(this));
      }
    );
  }

  dayClicked({
               date,
               events
             }: {
    date: Date;
    events: Array<CalendarEvent<{ film }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<Event>): void {
    console.log(event);
    this.router.navigateByUrl(event.meta.viewUrl);
  }
}

export const colors: any = {
  main: {
    primary: '#D31841',
    secondary: '#FAE3E3'
  }
};
