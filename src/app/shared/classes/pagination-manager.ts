import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Model } from '@app/api/models/model';
import { Pagination } from '@app/api/models/pagination';
import { PaginationInfo } from '@app/shared/interfaces/pagination-info';
import { OrderInfo } from '@app/shared/interfaces/order-info';
import { LaravelPaginatorComponent } from '@app/shared/components/laravel-paginator/laravel-paginator.component';

export class PaginationManager<T extends Model> {
  /**
   * Component that includes this will listen to this event and make requests to api
   */
  change = new EventEmitter<{ pagination: PaginationInfo, order: OrderInfo }>();
  defaultPage = 1;
  defaultPerPage = 25;
  loading = false;

  constructor(private matSort: MatSort,
              private paginator?: LaravelPaginatorComponent) {
    this.matSort.sortChange.subscribe(this.sortChange.bind(this));
    if (this.paginator) {
      this.paginator.page.subscribe(event => this.onPage(event));
    }
    this._dataSource.data = [];
  }

  private _pagination: Pagination<T>;

  get pagination() {
    return this._pagination;
  }

  private _dataSource = new MatTableDataSource<T>([]);

  get dataSource() {
    return this._dataSource;
  }

  /**
   * Send the first pagination event to make the initial request
   */
  init() {
    this.emmitChanges({page: this.defaultPage, per_page: this.defaultPerPage});
  }

  /**
   * Listen paginator events
   */
  onPage(e: PageEvent) {
    this.emmitChanges({
      page: e.pageIndex + 1,
      per_page: e.pageSize
    });
  }

  /**
   * Listen sort change events
   */
  sortChange(e: Sort) {
    this.emmitChanges({
      page: this._pagination.current_page,
      per_page: this._pagination.per_page,
    });
  }

  /**
   * Listen filter data changes Event
   */
  filterChange() {
    this.emmitChanges({
      page: 1,
      per_page: this._pagination ? this._pagination.per_page : 25,
    });
  }

  /**
   * Set pagination from request to this manager
   */
  setPagination(pagination: Pagination<T>) {
    this.loading = false;
    this._pagination = pagination;
    this._dataSource.data = pagination.data;
  }

  /**
   * Updates data of the pagination
   * @param {T[]} data
   */
  updateData(data: T[]) {
    this._dataSource.data = data;
    this._pagination.data = data;
  }

  /**
   * Remove an element from the paginated data
   */
  removeElement(element: T) {
    const data = this.dataSource.data;
    data.splice(data.indexOf(element), 1);
    if (this.isEmpty) {
      this.filterChange();
    } else {
      this.updateData(data);
    }
  }

  /**
   * Append an element for the paginated data
   */
  appendElement(element: T) {
    this.dataSource.data.push(element);
    this.refresh();
  }

  /**
   * Append an element for the paginated data
   */
  prependElement(element: T) {
    this.dataSource.data.unshift(element);
    this.refresh();
  }

  /**
   * Gets order data
   */
  public getOrder() {
    let order: OrderInfo;
    if (this.matSort.direction.length) {
      order = {
        field: this.matSort.active,
        direction: this.matSort.direction
      };
    }

    return order;
  }

  protected emmitChanges(pagination) {
    this.loading = true;
    this.change.emit({
      pagination,
      order: this.getOrder()
    });
  }

  get isEmpty() {
    if (this.pagination) {
      return !this.pagination.data.length && !this.loading;
    }
  }

  refresh() {
    this.updateData(this.dataSource.data);
  }
}
