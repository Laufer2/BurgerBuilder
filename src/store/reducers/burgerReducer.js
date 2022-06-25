import { createSlice } from "@reduxjs/toolkit";

const INGREDIENT_PRICES = {
  salad: 0.7,
  meat: 1.2,
  bacon: 0.9,
  cheese: 0.4
}

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 4,
}

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients[action.payload.ingredient] += 1;
      state.totalPrice += INGREDIENT_PRICES[action.payload.ingredient];
    },
    removeIngredient: (state, action) => {
      state.ingredients[action.payload.ingredient] -= 1;
      state.totalPrice -= INGREDIENT_PRICES[action.payload.ingredient];
    }
  }
})

const { actions, reducer } = burgerSlice;

export default reducer;
export const { addIngredient, removeIngredient } = actions;