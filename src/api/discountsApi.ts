import Api from './api';
import { ICategory, IProduct } from '../interfaces/product.interface';
import { IDiscounts } from 'src/interfaces/discounts.interface';

class DiscountsApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = '/promotion';
  }

  async get(param: Query): Promise<ApiListResponse<IDiscounts>> {
    return Api.GET(this.baseUrl + '/list', param);
  }

  async create(body: any): Promise<ApiResponse<string>> {
    return Api.POST(this.baseUrl + `/save`, body);
  }

  async update(id: number, body: any): Promise<ApiResponse<string>> {
    return Api.PUT(this.baseUrl + `/update/${id}`, body);
  }

  async getOne(id: number): Promise<ApiResponse<IDiscounts>> {
    return Api.GET(this.baseUrl + `/get/${id}`);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return Api.DELETE(this.baseUrl + `/delete/${id}`);
  }
}

export default new DiscountsApi();
