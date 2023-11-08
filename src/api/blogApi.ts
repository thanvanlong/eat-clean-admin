
import Api from './api';
import {IBlog, ICategory, IProduct} from '../interfaces/product.interface';

class BlogApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = '/blog';
  }

  async get(_param: Query): Promise<ApiListResponse<IProduct>> {
    return Api.GET(this.baseUrl + '/get', _param);
  }
  async getBlogs(
      _param: Query,
  ): Promise<ApiListResponse<IBlog>> {
    return Api.GET(this.baseUrl + `/get-blog?page=${_param.page}&limit=${_param.limit}`);
  }


  async getCategory(): Promise<ApiResponse<ICategory[]>> {
    return Api.GET(this.baseUrl + `/category` );
  }

  async createBlog(body: FormData): Promise<ApiResponse<boolean>> {
    return Api.POST(this.baseUrl + `/create`, body);
  }

  async updateBlog(body: FormData): Promise<ApiResponse<boolean>> {
    return Api.PUT(this.baseUrl + `/update`, body);
  }

  async getOne(
      _param: number,
  ): Promise<ApiResponse<IBlog>> {
    return Api.GET(this.baseUrl + `/${_param}`);
  }


  async deleteOne(
      _param: number,
  ): Promise<ApiResponse<any>> {
    return Api.DELETE(this.baseUrl + `/${_param}`);
  }
}



export default new BlogApi();
