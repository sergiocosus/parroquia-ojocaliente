import { NgModule } from '@angular/core';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventEditDialogComponent } from './components/event-edit-dialog/event-edit-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { CalendarModule } from 'angular-calendar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { PostModule } from '@app/post/post.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { MainEventListComponent } from './components/main-event-list/main-event-list.component';
import { GalleryModule } from '../gallery/gallery.module';


@NgModule({
    imports: [
        SharedModule,
        CalendarModule,
        MatProgressBarModule,
        MatButtonToggleModule,
        ShareButtonsModule,
        PostModule,
        MatTabsModule,
        GalleryModule,
    ],
  declarations: [
    EventEditComponent,
    EventEditDialogComponent,
    EventCalendarComponent,
    EventDetailComponent,
    EventListComponent,
    MainEventListComponent
  ],
  entryComponents: [
    EventEditDialogComponent
  ],
  exports: [
    EventEditComponent,
    EventEditDialogComponent,
    EventCalendarComponent,
    EventDetailComponent,
    EventListComponent,
    MainEventListComponent
  ]
})
export class EventModule {
}
