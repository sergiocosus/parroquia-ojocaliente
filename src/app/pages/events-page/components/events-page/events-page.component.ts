import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMetaService } from '@app/shared/services/app-meta.service';
import { extract } from '@app/shared/services/i18n.service';
import { Event } from '../../../../modules/api/models/event.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, finalize, mergeMap, startWith, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '../../../../modules/api/services/event.service';
import { EventEditDialogComponent } from '../../../../modules/event/components/event-edit-dialog/event-edit-dialog.component';
import { Notify } from '../../../../shared/services/notify.service';
import { EventCalendarComponent } from '../../../../modules/event/components/event-calendar/event-calendar.component';
import { MainEventListComponent } from '../../../../modules/event/components/main-event-list/main-event-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { SubscriptionManager } from '../../../../shared/classes/subscription-manager';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  @ViewChild(EventCalendarComponent) eventCalendar: EventCalendarComponent;
  @ViewChild(MainEventListComponent) mainEventList: MainEventListComponent;
  filterForm: FormGroup;
  sub = new SubscriptionManager();
  loading: boolean;
  events: Event[];

  constructor(private appMetaService: AppMetaService,
              private dialog: MatDialog,
              private eventService: EventService,
              private notify: Notify,
              private fb: FormBuilder) {
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
    });
  }

  ngOnInit(): void {
    this.appMetaService.update(extract('contact.contact'));
  }

  edit(event: Event) {
    this.dialog.open(EventEditDialogComponent, {data: event}).afterClosed()
      .pipe(filter(a => !!a)).subscribe(
      eventUpdated => {
        event.replaceProperties(eventUpdated);
        this.eventCalendar.refreshEvents();
      }
    );
  }

  deleteEvent(event: Event) {
    console.log(this.mainEventList.events);

    this.dialog.open(ConfirmDialogComponent, {
      data: {message: event.title} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(a => !!a),
      mergeMap(() => this.eventService.delete(event.slug))
    ).subscribe(
      () => {
        if (this.filterForm.get('with_trashed').value) {
          event.deleted_at = new Date();
        } else {
          this.eventCalendar.removeEvent(event);
          console.log(this.mainEventList.events);

          _.remove(this.mainEventList.events, {id: event.id});
        }
      },
      error => this.notify.error(error)
    );
  }

  restoreEvent(event: Event) {
    this.eventService.restore(event.slug).subscribe(
      restoredEvent => event.replaceProperties(restoredEvent),
      error => this.notify.error(error)
    );
  }


  create() {
    this.dialog.open(EventEditDialogComponent).afterClosed()
      .pipe(filter(a => !!a)).subscribe(
      event => {
        this.eventCalendar.calendarEvents.push(this.eventCalendar.createCalendarEvent(event));
        this.eventCalendar.events.push(event);
      }
    );
  }
}

