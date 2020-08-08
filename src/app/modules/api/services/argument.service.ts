import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Argument } from '../models/argument.model';
import { Pagination } from '@app/api/models/pagination';
import { PaginationService } from '@app/api/services/pagination.service';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';

@Injectable({
  providedIn: 'root'
})
export class ArgumentService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  get(pagination?: PaginationInfo, order?: OrderInfo, filters?: any) {
    const params = this.paginationService.createHttpParams(pagination, order, filters);
    return this.httpClient.get('argument', {params})
      .pipe(this.mapArgumentPaginated());
  }

  getOne(slug: string) {
    return this.httpClient.get(`argument/${slug}`).pipe(
      this.mapArgument()
    );
  }

  post(params: {
    argument: string,
    answer: string
  }) {
    return this.httpClient.post('argument', params,
      {reportProgress: true, observe: 'events'}).pipe(
      this.mapArgumentEvent()
    );
  }

  edit(id: number, params: {
    argument?: string,
    answer?: string
    order?: number
  }) {
    return this.httpClient.put(`argument/${id}`, params,
      {reportProgress: true, observe: 'events'}).pipe(
      this.mapArgumentEvent()
    );
  }

  delete(argument_id: number) {
    return this.httpClient.delete(`argument/${argument_id}`);
  }

  restore(argument_id: number) {
    return this.httpClient.patch(`argument/${argument_id}`, {})
      .pipe(this.mapArgument());
  }

  private mapArgumentPaginated() {
    return map(response => new Pagination().parse(response['paginated_arguments'])
      .parseData(Argument) as Pagination<Argument>);
  }

  private mapArgumentEvent() {
    return map((response: HttpEvent<any>) => {
      if (response['type'] === HttpEventType.Response) {
        return new Argument().parse(response.body['argument']);
      }
      return response;
    });
  }

  private mapArgument() {
    return map(response => new Argument().parse(response['argument']));
  }

}
