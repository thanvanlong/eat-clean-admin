
import Api from "./api";
import { ILoginData, IRegisterData, IToken, IUser } from "../interfaces";

class AuthApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "/users";
  }

  async login(
    loginInfomation: ILoginData
  ): Promise<ApiResponse<IUser & IToken>> {
    return Api.POST<ApiResponse<IUser & IToken>>(
      this.baseUrl + "/login",
      // @ts-ignore
      new URLSearchParams(loginInfomation)
    );
  }

  async register(singupInfomation: IRegisterData): Promise<ApiResponse<any>> {
    return Api.POST<ApiResponse<any>>(
      this.baseUrl + "/register",
      singupInfomation
    );
  }

  async update(data: any): Promise<ApiResponse<any>> {
    return Api.PUT<ApiResponse<any>>(
        this.baseUrl + `/update`,
        data
    );
  }

  async deleteOne(
      _param: number,
  ): Promise<ApiResponse<any>> {
    return Api.DELETE(this.baseUrl + `/${_param}`);
  }

  async refreshToken(): Promise<ApiResponse<IToken>> {
    return Api.POST<ApiResponse<IToken>>(this.baseUrl + "/refresh", {});
  }

  async logout() {
    return Api.POST(this.baseUrl + "/logout", {});
  }
}

export default new AuthApi();
