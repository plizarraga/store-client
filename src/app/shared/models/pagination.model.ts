import { IProduct } from './product.model';

export interface IPagination {
  data: IProduct[];
  meta: IMeta;
}

export interface IMeta {
  count: number;
  pageIndex: number;
  pageSize: number;
}

export class Pagination implements IPagination {
  data: IProduct[] = [];
  meta: IMeta;
}
