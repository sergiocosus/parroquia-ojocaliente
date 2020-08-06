import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Event } from '@app/api/models/event.model';
import { User } from '@app/api/models/user.model';
import { EventService } from '@app/api/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SessionService } from '@app/api/services/session.service';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Notify } from '@app/shared/services/notify.service';
import * as _ from 'lodash';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit, OnChanges {
  @Output() editClick = new EventEmitter();
  @Output() restoreClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Input() events: Event[];

  view = null;
  viewDate: Date = new Date();

  activeDayIsOpen = false;
  calendarEvents: CalendarEvent<Event>[];

  locale = 'es-MX';

  actions: CalendarEventAction[] = [
    {
      label: '<i class="calendar-icon fas fa-pencil-alt"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.editClick.emit(event.meta);
      },
    }
  ];

  user: User;
  filterForm: FormGroup;
  sub = new SubscriptionManager();
  loading = false;

  constructor(private eventService: EventService,
              private dialog: MatDialog,
              private router: Router,
              private sessionService: SessionService,
              private fb: FormBuilder,
              private notify: Notify) {

    this.sessionService.getLoggedUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.view = CalendarView.Month;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.refreshEvents();
    }
  }

  tabSelected(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.view = CalendarView.Month;
        break;
      case 1:
        this.view = CalendarView.Week;
        break;
      case 2:
        this.view = CalendarView.Day;
        break;
      default:
        this.view = null;
    }
  }

  createCalendarEvent(event: Event) {
    return {
      title: event.title,
      start: new Date(event.begin_at),
      end: new Date(event.end_at),
      color: colors.main,
      meta: event,
      actions: this.canEditEvent() ? this.actions : null,
    };
  }

  private canEditEvent() {
    return this.user && this.user.can('update-event');
  }

  dayClicked({date, events}: {
    date: Date;
    events: Array<CalendarEvent<Event>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen)
        || events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<Event>): void {
    this.router.navigateByUrl(event.meta.viewUrl);
  }


  removeEvent(event: Event) {
    _.remove(this.events, {id: event.id});
    _.remove(this.calendarEvents, {meta: {id: event.id}});
  }

  refreshEvents() {
    if (this.events) {
      this.calendarEvents = this.events.map(this.createCalendarEvent.bind(this));
    }
  }

}

export const colors: any = {
  main: {
    primary: '#d38127',
    secondary: '#fae9cc'
  }
};
