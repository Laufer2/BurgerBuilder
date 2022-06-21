import burgerReducer from './reducers/burgerReducer';
import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from './reducers/orderReducer';

const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    burger: burgerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersApi.middleware),
});

export default store;