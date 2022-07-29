import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../shared/models/pagination';
import { IProductBrand } from '../shared/models/product-brand';
import { IProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.productBrandId !== 0) {
      params = params.append('brandId', shopParams.productBrandId.toString());
    }

    if (shopParams.productTypeId !== 0) {
      params = params.append('typeId', shopParams.productTypeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort.toString());
    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);
    
    return this.http.get<IPagination>(`${this.api}/products`, { observe: 'response', params: params })
      .pipe(
        map(response => response.body)
      )
  }

  getProductBrands() {
    return this.http.get<IProductBrand[]>(`${this.api}/product_brands`);
  }

  getProductTypes() {
    return this.http.get<IProductType[]>(`${this.api}/product_types`);
  }
}
