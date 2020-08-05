import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginationService } from '@app/api/services/pagination.service';
import { ContactResponse } from '@app/api/models/contact-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactResponseService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  get(params?) {
    return this.httpClient.get(`contact-response`, {params}).pipe(
      this.mapContactResponses()
    );
  }

  getOne(contact_response_id: number) {
    return this.httpClient.get(`contact-response/${contact_response_id}`).pipe(
      this.mapContactResponse()
    );
  }

  post(params) {
    return this.httpClient.post('contact-response', params).pipe(
      this.mapContactResponse()
    );
  }

  edit(id: number, params) {
    return this.httpClient.put(`contact-response/${id}`, params)
      .pipe(this.mapContactResponse());
  }

  delete(contact_response_id: number) {
    return this.httpClient.delete(`contact-response/${contact_response_id}`);
  }

  restore(contact_response_id: number) {
    return this.httpClient.patch(`contact-response/${contact_response_id}`, {})
      .pipe(this.mapContactResponse());
  }

  private mapContactResponse() {
    return map(response => new ContactResponse().parse(response['contact_response']));
  }

  private mapContactResponses() {
    return map(response => ContactResponse.parseArray(response['contact_responses']));
  }
}
