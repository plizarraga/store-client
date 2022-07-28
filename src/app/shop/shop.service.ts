import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination } from '../core/models/pagination';
import { IProductBrand } from '../core/models/productBrand';
import { IProductType } from '../core/models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private api = environment.api;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IPagination>(`${this.api}/products`);
  }

  getProductBrands() {
    return this.http.get<IProductBrand[]>(`${this.api}/product_brands`);
  }

  getProductTypes() {
    return this.http.get<IProductType[]>(`${this.api}/product_types`);
  }
}
