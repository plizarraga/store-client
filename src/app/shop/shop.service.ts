import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IProductBrand } from '../shared/models/product-brand';
import { IProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private api = environment.api;
  shopParams = new ShopParams();

  constructor(private http: HttpClient) {}

  getProducts() {
    let params = new HttpParams();

    if (this.shopParams.productBrandId !== 0) {
      params = params.append(
        'brandId',
        this.shopParams.productBrandId.toString()
      );
    }

    if (this.shopParams.productTypeId !== 0) {
      params = params.append(
        'typeId',
        this.shopParams.productTypeId.toString()
      );
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort.toString());
    params = params.append('pageSize', this.shopParams.pageSize);
    params = params.append('pageIndex', this.shopParams.pageNumber);

    return this.http
      .get<IPagination>(`${this.api}/products`, {
        observe: 'response',
        params: params,
      })
      .pipe(map((response) => response.body));
  }

  getProductById(productId: string) {
    return this.http.get<IProduct>(`${this.api}/products/${productId}`);
  }

  getProductBrands() {
    return this.http.get<IProductBrand[]>(`${this.api}/product_brands`);
  }

  getProductTypes() {
    return this.http.get<IProductType[]>(`${this.api}/product_types`);
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }
}
