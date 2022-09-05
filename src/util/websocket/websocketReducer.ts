import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";

export interface WebsocketOnMessage {
  onMessage: (ev: MessageEvent<string>) => MessageEvent<string>;
  priority: number;
  id: string;
}


interface WebsocketState {
  consumers: WebsocketOnMessage[];
}

const initialState: WebsocketState = {
  consumers: [],
};

const removeConsumer = (
  state: WebsocketState,
  consumerId: string
) => {
  state.consumers = state.consumers.filter(
    (consumer) => !(consumer.id === consumerId)
  );
  return state;
};


export const websocketSlice = createSlice({
  name: "Websocket",
  initialState: initialState,
  reducers: {
    addWebsocketConsumer(state, action: PayloadAction<WebsocketOnMessage>) {
      removeConsumer(state, action.payload.id)
      state.consumers.push(action.payload);
    },
    removeWebsocketConsumer(state, action: PayloadAction<string>) {
      removeConsumer(state, action.payload)
    }
  },
});

export const { addWebsocketConsumer, removeWebsocketConsumer } = websocketSlice.actions;

export const selectWebsocketConsumers = (state: RootState) => state.websocket.consumers;

export default websocketSlice.reducer;
