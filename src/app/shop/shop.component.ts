import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IProductBrand } from '../shared/models/product-brand';
import { IProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, AfterViewInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  
  products: IProduct[] = [];
  productBrands: IProductBrand[] = [];
  productTypes: IProductType[] = [];

  paramsOptions: ShopParams;
  totalOfProducts: number;

  sortOptions = [
    { name: 'Name: A-Z', value: 'nameAsc' },
    { name: 'Name: Z-A', value: 'nameDesc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(
    private shopService: ShopService,
    private cd: ChangeDetectorRef,
  ) {
    this.paramsOptions = this.shopService.getShopParams();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  getProducts(): void {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        // this.paramsOptions.pageNumber = response.meta.pageIndex;
        // this.paramsOptions.pageSize = response.meta.pageSize;
        this.totalOfProducts = response.meta.count;
      },
      complete: () =>{
        this.cd.detectChanges()
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
    // this.paramsOptions.productBrandId = brandId;
    // this.paramsOptions.pageNumber = 1;
    // this.getProducts();
    const params = this.shopService.getShopParams();
    params.productBrandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onProductTypeSelected(typeId: number): void {
    // this.paramsOptions.productTypeId = typeId;
    // this.paramsOptions.pageNumber = 1;
    // this.getProducts();
    const params = this.shopService.getShopParams();
    params.productTypeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    // this.paramsOptions.sort = sort;
    // this.getProducts();
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any): void {
    // if (this.paramsOptions.pageNumber !== event) {
    //   this.paramsOptions.pageNumber = event;
    //   this.getProducts();
    // }
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts();
    }
  }

  onSearch(): void {
    // this.paramsOptions.search = this.searchTerm.nativeElement.value;
    // this.paramsOptions.pageNumber = 1;
    // this.getProducts();
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onResent(): void {
    // this.searchTerm.nativeElement.value = '';
    // this.paramsOptions = new ShopParams();
    // this.getProducts();
    this.searchTerm.nativeElement.value = '';
    this.paramsOptions = new ShopParams();
    this.shopService.setShopParams(this.paramsOptions);
    this.getProducts();
  }
}
