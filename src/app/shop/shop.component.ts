import { Component, OnInit } from '@angular/core';
import { IProduct } from '../core/models/product';
import { IProductBrand } from '../core/models/productBrand';
import { IProductType } from '../core/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  productBrands: IProductBrand[] = [];
  productTypes: IProductType[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  getProducts(): void {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  getProductBrands(): void {
    this.shopService.getProductBrands().subscribe({
      next: (response) => {
        this.productBrands = response;
      },
      error: (error) => console.error(error),
    });
  }

  getProductTypes(): void {
    this.shopService.getProductTypes().subscribe({
      next: (response) => {
        this.productTypes = response;
      },
      error: (error) => console.error(error),
    });
  }
}
