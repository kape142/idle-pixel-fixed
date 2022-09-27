import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";

interface LocalStorageState {
  subscribers: LocalStorageSubscriber[];
}

interface LocalStorageSubscriber {
  setValue: (data: any) => void;
  key: string;
  id: string;
}

const initialState: LocalStorageState = {
  subscribers: [],
};

const removeSubscriber = (
  state: LocalStorageState,
  subscriber: Omit<LocalStorageSubscriber, "setValue">
) => {
  state.subscribers = state.subscribers.filter(
    (sub) => !(sub.id === subscriber.id && sub.key === subscriber.key)
  );
  return state;
};

export const localStorageSlice = createSlice({
  name: "Local Storage",
  initialState: initialState,
  reducers: {
    subscribeToLocalStorage(
      state,
      action: PayloadAction<LocalStorageSubscriber>
    ) {
      state = removeSubscriber(state, action.payload);
      state.subscribers.push(action.payload);
    },
    unsubscribeFromLocalStorage(
      state,
      action: PayloadAction<Omit<LocalStorageSubscriber, "setValue">>
    ) {
      state = removeSubscriber(state, action.payload);
    },
  },
});

export const { subscribeToLocalStorage, unsubscribeFromLocalStorage } =
  localStorageSlice.actions;

export const selectLocalStorageSubscribers = (state: RootState) =>
  state.localStorage.subscribers;

export default localStorageSlice.reducer;
