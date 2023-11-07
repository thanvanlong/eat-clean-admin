
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import productApi from "../../api/productApi";
import {IRegisterData} from "../../interfaces";
import authApi from "../../api/authApi";
import {ICategory, IComment, IProduct} from "../../interfaces/product.interface";
import {LoadingStatus} from "../../enums/enum";
import {toastOption} from "../../configs/notification.config";


export const getProductByPage = createAsyncThunk(
  'products/get',
  async (input: Query, thunkAPI) => {
    const response = await productApi.get(input);
    console.log(response);
    if (!response.success)
      throw { message: response.message, errorCode: response.errorCode };
    return response.data;
  }
);

export const getCategory = createAsyncThunk(
    "products/category",
    async (thunkAPI) => {
        const response = await productApi.getCategory()
        if (!response.success)
            throw { message: response.message, errorCode: response.errorCode };
        return response.data;
    }
);

export const getProductById = createAsyncThunk(
    "get",
    async (input: number, thunkAPI) => {
        const response = await productApi.getOne(input)
        if (!response.success)
            throw { message: response.message, errorCode: response.errorCode };
        return response.data;
    }
);

export const createProduct = createAsyncThunk(
    "products/create",
    async (input: FormData, thunkAPI) => {
        const response = await productApi.createProduct(input)
        if (!response.success)
            throw { message: response.message, errorCode: response.errorCode };
        return response.data;
    }
);

export const requestRegister = createAsyncThunk(
  'auth/register',
  async (input: IRegisterData, thunkAPI) => {
    const response = await authApi.register(input);
    if (!response.success)
      throw { message: response.message, errorCode: response.errorCode };
    return response.data;
  }
);

export interface ProductState {
    products: IProduct[] | null;
    product: IProduct | null;
    categories: ICategory[] | null;
    error: ErrorResponse | null;
    loading: LoadingStatus;
    metadata: IMetadata | null;
}

const initialState: ProductState = {
    products: null,
    product: null,
    categories: null,
    error: null,
    loading: LoadingStatus.Pending,
    metadata: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductByPage.fulfilled, (state, action) => {
        if (action.payload == null) return;
        state.products = action.payload.results;
        state.metadata = action.payload.metadata;
      })
        .addCase(getCategory.fulfilled, (state, action) => {
            if (action.payload == null) return;
            state.categories = action.payload;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            if (action.payload == null) return;
            state.product = action.payload;
        })
      .addMatcher(
        (action) => action.type.includes('rejected'),
        (state, action) => {
          console.log(action);

          state.error = {
            message: action.payload?.message ?? action.error.message,
            errorCode: action.payload?.errorCode ?? action.error.code
          };
          state.loading = LoadingStatus.Rejected;

          toast.error(state.error.message, toastOption);
        }
      )
      .addMatcher(
        (action) => action.type.includes('fulfilled'),
        (state, action) => {
          state.error = null;
          state.loading = LoadingStatus.Fulfilled;
        }
      )
      .addDefaultCase((state, action) => {
        // console.log(`action type: ${action.type}`, current(state));
      });
  }
});
export default productSlice.reducer;
