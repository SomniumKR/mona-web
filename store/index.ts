import {
  configureStore, ThunkAction, Action, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import web3Reducer from 'store/slices/web3';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const middleware = [...customizedMiddleware, logger];

const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
  middleware,
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export const wrapper = createWrapper(makeStore);
