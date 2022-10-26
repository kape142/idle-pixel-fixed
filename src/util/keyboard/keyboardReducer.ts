import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";
import {KeyboardEventHandler} from "react";

interface KeyboardState {
  subscribers: KeyboardSubscriber[];
}

interface KeyboardSubscriber {
  onKeyDown?: KeyboardEventHandler<Body>;
  onKeyUp?: KeyboardEventHandler<Body>;
  key: string;
  id: string;
}

const initialState: KeyboardState = {
  subscribers: [],
};

const removeSubscriber = (
  state: KeyboardState,
  subscriber: { key: string, id: string }
) => {
  state.subscribers = state.subscribers.filter(
    (sub) => !(sub.id === subscriber.id && sub.key === subscriber.key)
  );
  return state;
};

export const keyboardSlice = createSlice({
  name: "Keyboard",
  initialState: initialState,
  reducers: {
    subscribeToKeyboardEvent(
      state,
      action: PayloadAction<KeyboardSubscriber>
    ) {
      state = removeSubscriber(state, action.payload);
      state.subscribers.push(action.payload);
    },
    unsubscribeFromKeyboardEvent(
      state,
      action: PayloadAction<{ key: string, id: string }>
    ) {
      state = removeSubscriber(state, action.payload);
    },
  },
});

export const { subscribeToKeyboardEvent, unsubscribeFromKeyboardEvent } =
  keyboardSlice.actions;

export const selectKeyboardEventSubscribers = (state: RootState) =>
  state.keyboard.subscribers;

export default keyboardSlice.reducer;
