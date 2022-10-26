import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";

export interface SetItemsObserver {
  onChange: (message: string) => void;
  item: string;
  id: string;
}


interface SetItemsState {
  observers: SetItemsObserver[];
}

const initialState: SetItemsState = {
  observers: [],
};

const removeObserver = (
  state: SetItemsState,
  observerId: string
) => {
  state.observers = state.observers.filter(
    (observer) => !(observer.id === observerId)
  );
  return state;
};


export const setItemsSlice = createSlice({
  name: "Set items",
  initialState: initialState,
  reducers: {
    addSetItemsObserver(state, action: PayloadAction<SetItemsObserver>) {
      removeObserver(state, action.payload.id)
      state.observers.push(action.payload);
    },
    removeSetItemsObserver(state, action: PayloadAction<string>) {
      removeObserver(state, action.payload)
    }
  },
});

export const { addSetItemsObserver, removeSetItemsObserver } = setItemsSlice.actions;

export const selectSetItemsObservers = (state: RootState) => state.setItems.observers;

export default setItemsSlice.reducer;
