import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Member } from '../models/member.model';
import { Pagination } from '@app/api/models/pagination';
import { PaginationService } from '@app/api/services/pagination.service';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  get(pagination?: PaginationInfo, order?: OrderInfo, filters?: any) {
    const params = this.paginationService.createHttpParams(pagination, order, filters);
    return this.httpClient.get('member', {params})
      .pipe(this.mapMemberPaginated());
  }

  getOne(slug: string) {
    return this.httpClient.get(`member/${slug}`).pipe(
      this.mapMember()
    );
  }

  post(params: {
    name: string,
    picture: {
      name: string,
      base64: string,
    }
  }) {
    return this.httpClient.post('member', params,
      {reportProgress: true, observe: 'events'}).pipe(
      this.mapMemberEvent()
    );
  }

  edit(id: number, params: {
    name: string,
    picture: {
      name: string,
      base64: string,
    }
  }) {
    return this.httpClient.put(`member/${id}`, params,
      {reportProgress: true, observe: 'events'}).pipe(
      this.mapMemberEvent()
    );
  }

  delete(member_id: number) {
    return this.httpClient.delete(`member/${member_id}`);
  }

  restore(member_id: number) {
    return this.httpClient.patch(`member/${member_id}`, {})
      .pipe(this.mapMember());
  }

  private mapMemberPaginated() {
    return map(response => new Pagination().parse(response['paginated_members'])
      .parseData(Member) as Pagination<Member>);
  }

  private mapMemberEvent() {
    return map((response: HttpEvent<any>) => {
      if (response['type'] === HttpEventType.Response) {
        return new Member().parse(response.body['member']);
      }
      return response;
    });
  }

  private mapMember() {
    return map(response => new Member().parse(response['member']));
  }

}
