import { configureStore } from "@reduxjs/toolkit";
import activityLogReducer from "../activitylog/activityLogReducer";
import localStorageReducer from "../util/localstorage/localStorageReducer";
import websocketReducer from "../util/websocket/websocketReducer";
import overviewReducer from "../overview/overviewReducer";
import setItemsReducer from "../overview/setItems/setItemsReducer";
import keyboardReducer from "../util/keyboard/keyboardReducer";
import modiferKeyReducer, {modifierKeySlice} from "../util/keyboard/modiferKeyReducer";

export const store = configureStore({
  reducer: {
    activityLog: activityLogReducer,
    localStorage: localStorageReducer,
    websocket: websocketReducer,
    overview: overviewReducer,
    setItems: setItemsReducer,
    keyboard: keyboardReducer,
    modifierKey: modiferKeyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
