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
  
  productBrandIdSelected: number = 0;
  productTypeIdSelected: number = 0;
  sortSelected: string = 'nameAsc';
  
  sortOptions = [
    { name: 'Name: A-Z', value: 'nameAsc' },
    { name: 'Name: Z-A', value: 'nameDesc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  getProducts(): void {
    this.shopService
      .getProducts(
        this.productBrandIdSelected,
        this.productTypeIdSelected,
        this.sortSelected
      )
      .subscribe({
        next: (response) => {
          this.products = response.data;
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

  onProductBrandSelected(brandId: number): void {
    this.productBrandIdSelected = brandId;
    this.getProducts();
  }

  onProductTypeSelected(typeId: number): void {
    this.productTypeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.sortSelected = sort;
    this.getProducts();
  }
}
