import burgerReducer from './reducers/burgerReducer';
import { configureStore } from '@reduxjs/toolkit';
import { fetchApi } from './reducers/fetchApi';

const store = configureStore({
  reducer: {
    [fetchApi.reducerPath]: fetchApi.reducer,
    burger: burgerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApi.middleware),
});

export default store;