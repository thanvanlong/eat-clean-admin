
import Api from './api';
import {IBill, IBlog, ICategory, IProduct} from '../interfaces/product.interface';

class BillApi {
    private baseUrl: string;
    constructor() {
        this.baseUrl = '/bill';
    }

    async get(): Promise<ApiListResponse<IBill>> {
        return Api.GET(this.baseUrl + '/');
    }

    async updateBill(body: FormData): Promise<ApiResponse<boolean>> {
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



export default new BillApi();
