import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBasketItem } from '../../models/basket.model';
import { IOrderItem } from '../../models/order.model';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent {
  // @Input() items: IBasketItem[] | IOrderItem[] = [];
  @Input() items = [];
  @Input() isBasket = true;
  @Input() isOrder = false;

  @Output() decrement: EventEmitter<IBasketItem> =
    new EventEmitter<IBasketItem>();

  @Output() increment: EventEmitter<IBasketItem> =
    new EventEmitter<IBasketItem>();

  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }
}
