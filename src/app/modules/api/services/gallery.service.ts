import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pagination } from '@app/api/models/pagination';
import { Gallery } from '@app/api/models/gallery.model';
import { GalleryPicture } from '@app/api/models/gallery-picture.model';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { PaginationService } from '@app/api/services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient,
              private paginationService: PaginationService) {
  }

  get(pagination?: PaginationInfo, order?: OrderInfo, filters?: any) {
    const params = this.paginationService.createHttpParams(pagination, order, filters);
    return this.http.get(`gallery`, {params})
      .pipe(this.mapGalleryPaginated());
  }

  getOne(slug: string) {
    return this.http.get(`gallery/${slug}`).pipe(this.mapGallery());
  }

  post(data) {
    return this.http.post(`gallery`, data,
      {reportProgress: true, observe: 'events'}).pipe(this.mapGalleryEvent());
  }

  put(slug: string, data) {
    return this.http.put(`gallery/${slug}`, data,
      {reportProgress: true, observe: 'events'}).pipe(this.mapGalleryEvent());
  }


  delete(slug: string) {
    return this.http.delete(`gallery/${slug}`);
  }

  restore(slug: string) {
    return this.http.patch(`gallery/${slug}`, {}).pipe(this.mapGallery());
  }

  picturePost(gallery_slug: string, data) {
    return this.http.post(`gallery/${gallery_slug}/picture`, data,
      {reportProgress: true, observe: 'events'}).pipe(this.mapGalleryPictureEvent());
  }

  picturePut(slug: string, data) {
    return this.http.put(`gallery/picture/${slug}`, data,
      {reportProgress: true, observe: 'events'}).pipe(this.mapGalleryPictureEvent());
  }

  pictureDelete(slug: string) {
    return this.http.delete(`gallery/picture/${slug}`);
  }

  pictureRestore(slug: string) {
    return this.http.patch(`gallery/picture/${slug}`, {}).pipe(this.mapGallery());
  }

  private mapGalleryPaginated() {
    return map(response => new Pagination().parse(response['paginated_galleries'])
      .parseData(Gallery) as Pagination<Gallery>);
  }

  private mapGallery() {
    return map(response => new Gallery().parse(response['gallery']));
  }


  private mapGalleries() {
    return map(response => Gallery.parseArray(response['galleries']));
  }

  private mapGalleryEvent() {
    return map((response: HttpEvent<any>) => {
      console.log(response);
      if (response['type'] === HttpEventType.Response) {
        return new Gallery().parse(response.body['gallery']);
      }
      return response;
    });
  }

  private mapGalleryPictureEvent() {
    return map((response: HttpEvent<any>) => {
      if (response['type'] === HttpEventType.Response) {
        return new GalleryPicture().parse(response.body['gallery_picture']);
      }
      return response;
    });
  }
}
