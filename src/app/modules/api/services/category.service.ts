import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pagination } from '@app/api/models/pagination';
import { Category } from '@app/api/models/category.model';
import { PaginationService } from '@app/api/services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient,
              private paginationService: PaginationService) {
  }

  get(data?) {
    const params = this.paginationService.addFilterParams(data);
    return this.httpClient.get('category', {params})
      .pipe(this.mapCategories());
  }

  getOne(slug: string) {
    return this.httpClient.get(`category/${slug}`).pipe(
      this.mapCategory()
    );
  }

  post(params: {
    title: string,
    thumbnail: {
      name: string,
      base64: string,
    }
  }) {
    return this.httpClient.post('category', params).pipe(
      this.mapCategory()
    );
  }

  edit(slug: string, params: {
    title: string,
    thumbnail: {
      name: string,
      base64: string,
    }
  }) {
    return this.httpClient.put(`category/${slug}`, params).pipe(
      this.mapCategory()
    );
  }

  delete(categorySlug: string) {
    return this.httpClient.delete(`category/${categorySlug}`);
  }

  private mapCategoriesPaginated() {
    return map(response => new Pagination().parse(response['paginated_categories'])
      .parseData(Category) as Pagination<Category>);
  }

  private mapCategory() {
    return map(response => new Category().parse(response['category']));
  }

  private mapCategories() {
    return map(response => Category.parseArray(response['categories']));
  }
}
