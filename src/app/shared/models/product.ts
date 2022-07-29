import { IProductBrand } from "./product-brand";
import { IProductType } from "./product-type";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  pictureUrl: string;
  productType: IProductType;
  productBrand: IProductBrand;
}