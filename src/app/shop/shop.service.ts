import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination, Pagination } from '../shared/models/pagination.model';
import { IProduct } from '../shared/models/product.model';
import { IProductBrand } from '../shared/models/product-brand.model';
import { IProductType } from '../shared/models/product-type.model';
import { ShopParams } from '../shared/models/shop-params.model';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private api = environment.api;

  private shopParams = new ShopParams();
  private pagination = new Pagination();
  private productCache = new Map();

  private products: IProduct[] = [];
  private brands: IProductBrand[] = [];
  private types: IProductType[] = [];

  constructor(private http: HttpClient) {}

  getProducts(useCache: boolean) {
    if (useCache === false) {
      this.productCache = new Map();
    }

    if (this.productCache.size > 0 && useCache === true) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination.data = this.productCache.get(
          Object.values(this.shopParams).join('-')
        );
        return of(this.pagination);
      }
    }

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
      .pipe(
        map((response) => {
          this.productCache.set(
            Object.values(this.shopParams).join('-'),
            response.body.data
          );
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  getProductById(productId: number) {
    let product: IProduct;
    this.productCache.forEach((products: IProduct[]) => {
      product = products.find((p) => p.id === productId);
    });

    if (product) {
      return of(product);
    }

    return this.http.get<IProduct>(`${this.api}/products/${productId}`);
  }

  getProductBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IProductBrand[]>(`${this.api}/product_brands`).pipe(
      tap((productBrands) => {
        this.brands = productBrands;
      })
    );
  }

  getProductTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IProductType[]>(`${this.api}/product_types`).pipe(
      tap((productTypes) => {
        this.types = productTypes;
      })
    );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }
}
