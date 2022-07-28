export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  productType: IProductTypeBrand;
  productBrand: IProductTypeBrand;
}

export interface IProductTypeBrand {
  id: number;
  name: string;
}
