import { IProduct } from "./product";

export interface IPagination {
    data: IProduct[];
    meta: IMeta;
}

export interface IMeta {
    count:     number;
    pageIndex: number;
    pageSize:  number;
}
