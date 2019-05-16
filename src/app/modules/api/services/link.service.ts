import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pagination } from '@app/api/models/pagination';
import { PaginationService } from '@app/api/services/pagination.service';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';
import { Link } from '@app/api/models/link.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  get(pagination?: PaginationInfo, order?: OrderInfo, filters?: any) {
    console.log(filters);
    const params = this.paginationService.createHttpParams(pagination, order, filters);
    return this.httpClient.get('link', {params})
      .pipe(this.mapCategoryPaginated());
  }

  getOne(link_id: number) {
    return this.httpClient.get(`link/${link_id}`).pipe(
      this.mapLink()
    );
  }

  post(params: {
    title: string,
    url: string,
    description: string
  }) {
    return this.httpClient.post('link', params).pipe(
      this.mapLink()
    );
  }

  edit(id: number, params: {
    title: string,
    url: string,
    description: string
  }) {
    return this.httpClient.put(`link/${id}`, params)
      .pipe(this.mapLink());
  }

  delete(link_id: number) {
    return this.httpClient.delete(`link/${link_id}`);
  }

  restore(link_id: number) {
    return this.httpClient.patch(`link/${link_id}`, {})
      .pipe(this.mapLink());
  }

  private mapCategoryPaginated() {
    return map(response => new Pagination().parse(response['paginated_links'])
      .parseData(Link) as Pagination<Link>);
  }

  private mapLink() {
    return map(response => new Link().parse(response['link']));
  }
}
