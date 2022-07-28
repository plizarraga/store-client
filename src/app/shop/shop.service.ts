import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../core/models/pagination';
import { IProductBrand } from '../core/models/productBrand';
import { IProductType } from '../core/models/productType';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getProducts(productBrandId?: number, productTypeId?: number, sort?: string) {
    let params = new HttpParams();

    if (productBrandId) {
      params = params.append('brandId', productBrandId.toString());
    }

    if (productTypeId) {
      params = params.append('typeId', productTypeId.toString());
    }

    if (sort) {
      params = params.append('sort', sort.toString());
    }
    
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
