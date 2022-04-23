import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: any[];
  amount: number;
  total: number;
  isLoading: boolean;
}

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      console.log(name);
      console.log(thunkAPI);
      console.log(thunkAPI.getState());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state: CartState) => {
      state.cartItems = [];
    },
    removeItem: (state: CartState, { payload: itemId }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state: CartState, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state: CartState, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state: CartState) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item: any) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      console.log(action);

      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(getCartItems.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
