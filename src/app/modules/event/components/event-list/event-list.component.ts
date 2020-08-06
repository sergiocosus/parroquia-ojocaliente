import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '@app/api/models/event.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { filter, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '@app/api/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input() events: Event[];
  @Output() editClick = new EventEmitter();
  @Output() restoreClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }



  edit(event: Event) {
    this.editClick.emit(event);
  }

  delete(event: Event) {
    this.deleteClick.emit(event);
  }

  restore(event: Event) {
    this.restoreClick.emit(event);
  }
}
