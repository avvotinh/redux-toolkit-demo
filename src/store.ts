import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import modalSlice from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
