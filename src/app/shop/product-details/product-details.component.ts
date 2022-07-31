import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<IProduct>;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private breadCrummbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product$ = this.shopService.getProductById(id).pipe(
      tap((product) => {
        this.breadCrummbService.set('@productDetails', product.name);
      })
    );
  }
}
