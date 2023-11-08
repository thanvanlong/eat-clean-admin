import Api from './api';
import { ICategory, IProduct } from '../interfaces/product.interface';
import { IUser } from 'src/interfaces';

class UserApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = '/users';
  }

  async get(query: Query): Promise<ApiListResponse<IUser>> {
    return Api.GET(this.baseUrl + '/list', query);
  }
}

export default new UserApi();
