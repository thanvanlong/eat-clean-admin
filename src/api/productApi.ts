import { ILoginData, IRegisterData, IToken, IUser } from '@/interfaces';
import Api from './api';
import { IProduct } from '@/interfaces/product.interface';

class ProductApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = '/products';
  }

  async get(_param: Query): Promise<ApiListResponse<IProduct>> {
    return Api.GET(this.baseUrl + '/get', _param);
  }
}

export default new ProductApi();
