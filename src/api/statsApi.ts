
import Api from './api';
import {IBill, IBlog, ICategory, IProduct} from '../interfaces/product.interface';

class StatsApi {
    private baseUrl: string;
    constructor() {
        this.baseUrl = '/stats';
    }

    async getTotalRevenue(): Promise<ApiResponse<number[]>> {
        return Api.GET(this.baseUrl + '/revenue');
    }

    async getCategoryRevenue(): Promise<ApiResponse<any>> {
        return Api.GET(this.baseUrl + '/category/year');
    }

    async getDaysRevenue(): Promise<ApiResponse<any>> {
        return Api.GET(this.baseUrl + '/revenue/week');
    }

    async exportReport(input: any) {
        const response =  await Api.POST<any>(this.baseUrl + `/export/report`, input);
        const href = window.URL.createObjectURL(new Blob([response]));

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "report.xlsx");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(href);
    }


}



export default new StatsApi();
