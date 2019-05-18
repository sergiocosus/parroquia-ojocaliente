import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Pagination } from '@app/api/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  basePath = 'event/';

  constructor(private http: HttpClient) {
  }

  get(params?: {not_expired}) {
    return this.http.get(`event`, {params}).pipe(this.mapEvents());
  }

  getOne(slug: string) {
    return this.http.get(`event/${slug}`).pipe(this.mapEvent());
  }


  post(data) {
    return this.http.post(`event`, data,
      {reportProgress: true, observe: 'events'}).pipe(this.mapEventEvent());
  }

  put(slug: string, data) {
    return this.http.put(`event/${slug}`, data,
      {reportProgress: true, observe: 'events'}).pipe(this.mapEventEvent());
  }

  delete(slug: string) {
    return this.http.delete(`event/${slug}`);
  }

  restore(slug: string) {
    return this.http.patch(`event/${slug}`, {}).pipe(this.mapEvent());
  }

  private mapEventPaginated() {
    return map(response => new Pagination().parse(response['paginated_events'])
      .parseData(Event) as Pagination<Event>);
  }

  private mapEvent() {
    return map(response => new Event().parse(response['event']));
  }

  private mapEventEvent() {
    return map((response: HttpEvent<any>) => {
      if (response['type'] === HttpEventType.Response) {
        return new Event().parse(response.body['event']);
      }
      return response;
    });
  }

  private mapEvents() {
    return map(response => Event.parseArray(response['events']));
  }
}
