import {IUser} from "./auth.interface";


export interface IProduct {
  id?: string;
  name?: string;
  slug?: string;
  price?: number;
  quantity?: number;
  imgs?: string[];
  shortDescription?: string;
  description?: string;
  categories?: ICategory[];
  orderCount?: number;
  canComment: boolean;
}

export interface IBlog {
  id: number;
  title: string;
  imgThumbnail: string;
  description: string;
  content: string;
}

export interface ICategory {
  id: number;
  label: string;
  key: string;
}

export interface ICart {
  id: number;
  quantity: number;
  foods: IProduct;
}

export interface IBill {
  id: number;
  carts: ICart[];
  user: IUser;
  phone: string;
  address: string;
  note: string;
  price: number;
  billStatus: string;
}