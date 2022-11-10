import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private api = environment.api;

  private basketSource = new BehaviorSubject<IBasket>(null);
  public basket$ = this.basketSource.asObservable();

  private basketTotalsSource = new BehaviorSubject<IBasketTotals>(null);
  public basketTotals$ = this.basketTotalsSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get<IBasket>(`${this.api}/baskets/${id}`).pipe(
      map((basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(`${this.api}/baskets`, basket).subscribe({
      next: (basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      },
      error: (error) => console.error(error),
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemtoBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id == item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id == item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some((x) => x.id === item.id)) {
      basket.items = basket.items.filter((x) => x.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(`${this.api}/baskets/${basket.id}`).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalsSource.next(null);
        localStorage.removeItem('basket_id');
      },
      error: (error) => console.error(error),
    });
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce(
      (previousValue, currentValue) =>
        currentValue.quantity * currentValue.price + previousValue,
      0
    );
    const total = subtotal + shipping;
    this.basketTotalsSource.next({ shipping, subtotal, total });
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((item) => item.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemtoBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand.name,
      type: item.productType.name,
    };
  }
}