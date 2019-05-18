import { NgModule } from '@angular/core';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventEditDialogComponent } from './components/event-edit-dialog/event-edit-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from '@app/event/components/calendar-header/calendar-header.component';
import { MatButtonToggleModule, MatProgressBarModule, MatTabsModule } from '@angular/material';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { PostModule } from '@app/post/post.module';
import { EventListComponent } from './components/event-list/event-list.component';


@NgModule({
  imports: [
    SharedModule,
    CalendarModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    ShareButtonsModule,
    PostModule,
    MatTabsModule,
  ],
  declarations: [
    EventEditComponent,
    EventEditDialogComponent,
    EventCalendarComponent,
    CalendarHeaderComponent,
    EventDetailComponent,
    EventListComponent
  ],
  entryComponents: [
    EventEditDialogComponent
  ],
  exports: [
    EventEditComponent,
    EventEditDialogComponent,
    EventCalendarComponent,
    EventDetailComponent
  ]
})
export class EventModule {
}
