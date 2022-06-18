import { configureStore } from "@reduxjs/toolkit";
import burgerReducer from './reducers'

const store = configureStore({
  reducer: {
    burger: burgerReducer
  }
})

export default store;