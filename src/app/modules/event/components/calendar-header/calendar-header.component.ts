import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {
  @Input() view: string;
  @Input() viewDate: Date;
  @Input() locale = 'es-MX';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  ngOnInit(): void {
  }
}
