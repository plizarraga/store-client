import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket.model';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private basketService: BasketService) {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotals$;
  }

  ngOnInit(): void {}

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
}
