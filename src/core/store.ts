import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/store/slice";

export const store = configureStore({
  reducer: { auth: authReducer },
});

export type AppDispatch = typeof store.dispatch;
