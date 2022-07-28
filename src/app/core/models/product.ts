import { IProductBrand } from "./productBrand";
import { IProductType } from "./productType";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  pictureUrl: string;
  productType: IProductType;
  productBrand: IProductBrand;
}