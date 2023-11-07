
import Api from './api';
import {ICategory, IProduct} from '../interfaces/product.interface';

class ProductApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = '/products';
  }

  async get(_param: Query): Promise<ApiListResponse<IProduct>> {
    return Api.GET(this.baseUrl + '/get', _param);
  }

  async getCategory(): Promise<ApiResponse<ICategory[]>> {
    return Api.GET(this.baseUrl + `/category` );
  }

  async createProduct(body: FormData): Promise<ApiResponse<boolean>> {
    return Api.POST(this.baseUrl + `/create-product`, body);
  }

  async getOne(
      _param: number,
  ): Promise<ApiResponse<IProduct>> {
    return Api.GET(this.baseUrl + `/${_param}`);
  }
}



export default new ProductApi();
