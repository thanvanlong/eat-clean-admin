import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import authSlice from './features/authSlice';
import productSlice from '../redux/features/productSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
};
const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store['getState']>;
export type AppDispatch = typeof store['dispatch'];
export const persistor: Persistor = persistStore(store);
