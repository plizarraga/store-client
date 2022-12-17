import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IProduct } from 'src/app/shared/models/product.model';
import { ShopService } from '../shop.service';
import { IBasketItem } from 'src/app/shared/models/basket.model';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private breadCrummbService: BreadcrumbService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');

    this.shopService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.breadCrummbService.set('@productDetails', product.name);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  incrementItemQuantity() {
    this.quantity++;
  }

  decrementItemQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }
}
