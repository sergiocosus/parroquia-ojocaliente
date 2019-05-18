import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventPageComponent } from './components/event-page/event-page.component';


export const eventsPageRouting: Routes = [
  {
    path: '',
    component: EventsPageComponent,
  },
  {
    path: ':event_slug',
    component: EventPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(eventsPageRouting)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule {
}

