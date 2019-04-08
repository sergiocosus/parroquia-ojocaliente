import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pagination } from '../models/pagination';
import { PaginationService } from '../services/pagination.service';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  getPaginated(filters = {}) {
    const params = this.paginationService.addFilterParams(filters);

    return this.httpClient.get(`media`, {params})
      .pipe(this.mapMediaPaginated());
  }

  post(params: {
    name: string,
    base64: string,
  }) {
    return this.httpClient.post('media', params).pipe(
      this.mapMedia()
    );
  }


  delete(media_id: number) {
    return this.httpClient.delete(`media/${media_id}`);
  }

  private mapMediaPaginated() {
    return map(response => new Pagination().parse(response['paginated_media'])
      .parseData(Media) as Pagination<Media>);
  }

  private mapMedia() {
    return map(response => new Media().parse(response['media']));
  }
}
