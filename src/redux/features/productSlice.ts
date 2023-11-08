
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import productApi from "../../api/productApi";
import {IRegisterData} from "../../interfaces";
import authApi from "../../api/authApi";
import {IBlog, ICategory, IProduct} from "../../interfaces/product.interface";
import {LoadingStatus} from "../../enums/enum";
import {toastOption} from "../../configs/notification.config";
import blogApi from "../../api/blogApi";


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

export const getBlogs = createAsyncThunk(
    'products/getblog',
    async (input: Query, thunkAPI) => {
        const response = await productApi.getBlogs(input);
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

export const getBlogById = createAsyncThunk(
    "get/blog",
    async (input: number, thunkAPI) => {
        const response = await blogApi.getOne(input)
        if (!response.success)
            throw { message: response.message, errorCode: response.errorCode };
        return response.data;
    }
);

export const deleteBlog = createAsyncThunk(
    "get/blog",
    async (input: number, thunkAPI) => {
        const response = await blogApi.deleteOne(input)
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

export const updateProduct = createAsyncThunk(
    "products/update",
    async (input: FormData, thunkAPI) => {
        const response = await productApi.updateProduct(input)
        if (!response.success)
            throw { message: response.message, errorCode: response.errorCode };
        return response.data;
    }
);


export const updateBlog = createAsyncThunk(
    "blog/update",
    async (input: FormData, thunkAPI) => {
        const response = await blogApi.updateBlog(input)
        if (!response.success)
            throw { message: response.message, errorCode: response.errorCode };
        return response.data;
    }
);

export const createBlog = createAsyncThunk(
    "products/create",
    async (input: FormData, thunkAPI) => {
        const response = await blogApi.createBlog(input)
        if (!response.success)
            throw { message: response.message, errorCode: response.errorCode };
        return response.data;
    }
);



export interface ProductState {
    products: IProduct[] | null;
    product: IProduct | null;
    categories: ICategory[] | null;
    blogs: IBlog[] | null;
    blog: IBlog | null;
    error: ErrorResponse | null;
    loading: LoadingStatus;
    metadata: IMetadata | null;
}

const initialState: ProductState = {
    products: null,
    product: null,
    categories: null,
    blogs: null,
    blog: null,
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
          state.product = null
      })
        .addCase(getCategory.fulfilled, (state, action) => {
            if (action.payload == null) return;
            state.categories = action.payload;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            if (action.payload == null) return;
            state.blogs = action.payload.results;
            state.blog = null;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            if (action.payload == null) return;
            state.product = action.payload;
        })
        .addCase(getBlogById.fulfilled, (state, action) => {
            if (action.payload == null) return;
            state.blog = action.payload;
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
