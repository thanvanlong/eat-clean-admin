
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {LoadingStatus} from "../../enums/enum";
import {toastOption} from "../../configs/notification.config";

export const addItem = createAsyncThunk(
  'cart/add',
  async (input: CartItem, thunkAPI) => {
    const cart = (thunkAPI.getState() as CartState).cart;
    cart.unshift(input);

    return cart;
  }
);

export const deleteItem = createAsyncThunk(
  'cart/delete',
  async (input: CartItem, thunkAPI) => {
    const cart = (thunkAPI.getState() as CartState).cart;
    const newCart = cart.filter(
      (cartItem: CartItem) => cartItem.id !== input.id
    );

    return newCart;
  }
);

export const updateItem = createAsyncThunk(
  'cart/update',
  async (input: CartItem[], thunkAPI) => {}
);

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  error: ErrorResponse | null;
  loading: LoadingStatus;
}

const initialState: CartState = {
  cart: [],
  error: null,
  loading: LoadingStatus.Pending
};

const authSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

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
export default authSlice.reducer;
