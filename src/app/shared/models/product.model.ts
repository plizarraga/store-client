import { IProductBrand } from "./product-brand.model";
import { IProductType } from "./product-type.model";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: IProductType;
  productBrand: IProductBrand;
}