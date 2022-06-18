import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 5
}

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients[action.payload.ingredient] += 1;
      state.totalPrice += action.payload.price;
    },
    removeIngredient: (state, action) => {
      state.ingredients[action.payload.ingredient] -= 1;
      state.totalPrice -= action.payload.price;
    }

  }
})

const { actions, reducer } = burgerSlice;

export default reducer;
export const { addIngredient, removeIngredient } = actions;