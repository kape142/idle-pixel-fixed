import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import activityLogReducer from "../activitylog/activityLogReducer";
import testReducer from "./testReducer";

export const store = configureStore({
  reducer: { test: testReducer, activityLog: activityLogReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
