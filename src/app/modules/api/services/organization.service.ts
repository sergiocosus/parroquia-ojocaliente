import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pagination } from '@app/api/models/pagination';
import { PaginationService } from '@app/api/services/pagination.service';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';
import { Organization } from '@app/api/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  get(params?) {
    return this.httpClient.get(`organization`, {params}).pipe(
      this.mapOrganizations()
    );
  }

  getOne(slug) {
    return this.httpClient.get(`organization/${slug}`).pipe(
      this.mapOrganization()
    );
  }

  post(params) {
    return this.httpClient.post('organization', params).pipe(
      this.mapOrganization()
    );
  }

  edit(id: number, params) {
    return this.httpClient.put(`organization/${id}`, params)
      .pipe(this.mapOrganization());
  }

  delete(organization_id: number) {
    return this.httpClient.delete(`organization/${organization_id}`);
  }

  restore(organization_id: number) {
    return this.httpClient.patch(`organization/${organization_id}`, {})
      .pipe(this.mapOrganization());
  }

  private mapCategoryPaginated() {
    return map(response => new Pagination().parse(response['paginated_organizations'])
      .parseData(Organization) as Pagination<Organization>);
  }

  private mapOrganization() {
    return map(response => new Organization().parse(response['organization']));
  }

  private mapOrganizations() {
    return map(response => Organization.parseArray(response['organizations']));
  }
}
