import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import testReducer from "./slices/testSlice";
// import counter2Reducer from "./slices/counter2Slice";

const reducer = {
  testReducer,
  // counter2Reducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();