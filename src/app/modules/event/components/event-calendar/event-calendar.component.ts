import { Component, OnInit } from '@angular/core';
import { Event } from '@app/api/models/event.model';
import { User } from '@app/api/models/user.model';
import { EventService } from '@app/api/services/event.service';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { SessionService } from '@app/api/services/session.service';
import { EventEditDialogComponent } from '@app/event/components/event-edit-dialog/event-edit-dialog.component';
import { filter, finalize, mergeMap, startWith, tap } from 'rxjs/operators';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Notify } from '@app/shared/services/notify.service';
import * as _ from 'lodash';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  view = null;
  viewDate: Date = new Date();

  activeDayIsOpen = false;
  events: Event[];
  calendarEvents: CalendarEvent<Event>[];

  locale = 'es-MX';

  actions: CalendarEventAction[] = [
    {
      label: '<i class="calendar-icon fas fa-pencil-alt"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.edit(event.meta);
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

    this.filterForm = this.fb.group({
      with_trashed: []
    });

    this.sub.add = this.filterForm.valueChanges.pipe(
      tap(() => this.loading = true),
      startWith(true),
      mergeMap(() => this.eventService.get(this.filterForm.getRawValue()).pipe(
        finalize(() => this.loading = false)
      ))
    ).subscribe(events => {
      this.events = events;
      this.calendarEvents = events.map(this.createCalendarEvent.bind(this));
    });
  }

  ngOnInit(): void {
  }

  tabSelected(event: MatTabChangeEvent) {
    switch (event.index) {
      case 1:
        this.view = CalendarView.Month;
        break;
      case 2:
        this.view = CalendarView.Week;
        break;
      case 3:
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

  deleteEvent(event: Event) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: event.title} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.eventService.delete(event.slug))
    ).subscribe(
      () => {
        if (this.filterForm.get('with_trashed').value) {
          event.deleted_at = new Date();
        } else {
          this.removeEvent(event);
        }
      },
      error => this.notify.error(error)
    );
  }

  private removeEvent(event: Event) {
    _.remove(this.events, {id: event.id});
    _.remove(this.calendarEvents, {meta: {id: event.id}});
  }

  restoreEvent(event: Event) {
    this.eventService.restore(event.slug).subscribe(
      restoredEvent => event.replaceProperties(restoredEvent),
      error => this.notify.error(error)
    );
  }
}

export const colors: any = {
  main: {
    primary: '#d38127',
    secondary: '#fae9cc'
  }
};
