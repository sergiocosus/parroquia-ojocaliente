import { Model } from './model';

export class Pagination<T extends Model> extends Model {
  current_page?: number;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
  data: T[];

  parseData(classs) {
    this.data = classs.parseArray(this.data);
    return this;
  }
}
