import { IDiscounts } from 'src/interfaces/discounts.interface';
import authApi from '../../api/authApi';
import { toastOption } from '../../configs/notification.config';
import { LoadingStatus } from '../../enums/enum';
import { ILoginData, IRegisterData, IUser } from '../../interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import discountsApi from 'src/api/discountsApi';

export const getAllDiscounts = createAsyncThunk(
  'discounts/getAll',
  async (input: Query, thunkAPI) => {
    const response = await discountsApi.get(input);
    if (!response.success)
      throw { message: response.message, errorCode: response.errorCode };
    return response.data;
  }
);

export const getOneDiscounts = createAsyncThunk(
  'discounts/getOne',
  async (input: number, thunkAPI) => {
    const response = await discountsApi.getOne(input);
    if (!response.success)
      throw { message: response.message, errorCode: response.errorCode };
    return response.data;
  }
);

export const create = createAsyncThunk(
  'discounts/create',
  async (input: IDiscounts, thunkAPI) => {
    const response = await discountsApi.create(input);
    if (!response.success)
      throw { message: response.message, errorCode: response.errorCode };
    return response.data;
  }
);

export const update = createAsyncThunk(
  'discounts/update',
  async (input: IDiscounts, thunkAPI) => {
    const { id, ...rest } = input;
    const response = await discountsApi.update(id, rest);
    if (!response.success)
      throw { message: response.message, errorCode: response.errorCode };
    return response.data;
  }
);

export interface DiscountsState {
  discounts: IDiscounts[];
  metadate: IMetadata;
  error: ErrorResponse | null;
  loading: LoadingStatus;
}

const initialState: DiscountsState = {
  discounts: [],
  metadate: {},
  error: null,
  loading: LoadingStatus.Pending
};

const discountsSlide = createSlice({
  name: 'discounts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllDiscounts.fulfilled, (state, action) => {
        if (action.payload == null) return;
        state.discounts = action.payload.results;
        state.metadate = action.payload.metadata;
        state.loading = LoadingStatus.Fulfilled;
      })
      .addMatcher(
        (action) => action.type.includes('rejected'),
        (state, action) => {
          console.log(action.type);

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
export default discountsSlide.reducer;
