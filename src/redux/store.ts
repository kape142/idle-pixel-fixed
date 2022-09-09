import { configureStore } from "@reduxjs/toolkit";
import activityLogReducer from "../activitylog/activityLogReducer";
import localStorageReducer from "../util/localstorage/localStorageReducer";
import testReducer from "./testReducer";
import websocketReducer from "../util/websocket/websocketReducer";
import overviewReducer from "../overview/overviewReducer";

export const store = configureStore({
  reducer: {
    test: testReducer,
    activityLog: activityLogReducer,
    localStorage: localStorageReducer,
    websocket: websocketReducer,
    overview: overviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
