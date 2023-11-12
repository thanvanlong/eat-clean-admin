
import Api from './api';
import {IBlog, ICategory, IProduct} from '../interfaces/product.interface';

class ProductApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = '/products';
  }

  async get(_param: Query): Promise<ApiListResponse<IProduct>> {
    return Api.GET(this.baseUrl + `/get?page=${_param.page}&limit=${_param.limit}`, _param);
  }
  async getBlogs(
      _param: Query,
  ): Promise<ApiListResponse<IBlog>> {
    return Api.GET(this.baseUrl + `/get-blog?page=${_param.page}&limit=${_param.limit}`);
  }


  async getCategory(): Promise<ApiResponse<ICategory[]>> {
    return Api.GET(this.baseUrl + `/category` );
  }

  async createProduct(body: FormData): Promise<ApiResponse<boolean>> {
    return Api.POST(this.baseUrl + `/create-product`, body);
  }

  async updateProduct(body: FormData): Promise<ApiResponse<boolean>> {
    return Api.PUT(this.baseUrl + `/update-product`, body);
  }

  async getOne(
      _param: number,
  ): Promise<ApiResponse<IProduct>> {
    return Api.GET(this.baseUrl + `/${_param}`);
  }

  async deleteOne(
      _param: number,
  ): Promise<ApiResponse<any>> {
    return Api.DELETE(this.baseUrl + `/delete-product/${_param}`);
  }
}



export default new ProductApi();
