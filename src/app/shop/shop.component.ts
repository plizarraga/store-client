import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product.model';
import { IProductBrand } from '../shared/models/product-brand.model';
import { IProductType } from '../shared/models/product-type.model';
import { ShopParams } from '../shared/models/shop-params.model';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;

  products: IProduct[];
  productBrands: IProductBrand[];
  productTypes: IProductType[];

  shopParams: ShopParams;
  totalOfProducts: number;

  sortOptions = [
    { name: 'Name: A-Z', value: 'nameAsc' },
    { name: 'Name: Z-A', value: 'nameDesc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getProductBrands();
    this.getProductTypes();
  }

  getProducts(useCache = false): void {
    this.shopService.getProducts(useCache).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalOfProducts = response.meta.count;
      },
      error: (error) => console.error(error),
    });
  }

  getProductBrands(): void {
    this.shopService.getProductBrands().subscribe({
      next: (response) => {
        this.productBrands = [{ id: 0, name: 'All' }, ...response];
      },
      error: (error) => console.error(error),
    });
  }

  getProductTypes(): void {
    this.shopService.getProductTypes().subscribe({
      next: (response) => {
        this.productTypes = [{ id: 0, name: 'All' }, ...response];
      },
      error: (error) => console.error(error),
    });
  }

  onSortSelected(sort: string): void {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onProductBrandSelected(brandId: number): void {
    const params = this.shopService.getShopParams();
    params.productBrandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onProductTypeSelected(typeId: number): void {
    const params = this.shopService.getShopParams();
    params.productTypeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any): void {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch(): void {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onResent(): void {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
