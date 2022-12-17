import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/delivery-method.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  // createOrder(order: IOrderToCreate) {
  //   return this.http.post(this.baseUrl + 'orders', order);
  // }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + '/delivery_methods').pipe(
      map((deliveryMethod: IDeliveryMethod[]) => {
        return deliveryMethod.sort((a, b) => b.price - a.price);
      })
    );
  }
}
