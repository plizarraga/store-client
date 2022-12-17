import { IAddress } from './address.model';

export interface IOrdertToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: IAddress;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string;
  status: string;
  deliveryMethod: string;
  shippingPrice: number;
  subtotal: number;
  total: number;
  shipToAddress: IAddress;
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  quantity: number;
  price: number;
}
