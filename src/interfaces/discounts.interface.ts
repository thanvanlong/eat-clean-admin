export interface IDiscounts {
  id?: number;
  quantity: number;
  name: string;
  description: string;
  discount: string;
  code: string;
  startAt: Date;
  endAt: Date;
}
