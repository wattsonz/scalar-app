import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// import testReducer from "./slices/testSlice";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

const reducer = {
  auth: authReducer,
  filter: filterReducer,
  cart: cartReducer,
  // testReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();