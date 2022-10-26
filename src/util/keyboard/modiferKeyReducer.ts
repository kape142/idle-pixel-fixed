import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";

interface ModifierKeyState {
  ctrlKey: boolean;
  shiftKey: boolean;
}

const initialState: ModifierKeyState = {
  ctrlKey: false,
  shiftKey: false,
};

export const modifierKeySlice = createSlice({
  name: "Modifier key",
  initialState: initialState,
  reducers: {
    ctrlKeyDown(state) {
      state.ctrlKey = true;
    },
    ctrlKeyUp(state) {
      state.ctrlKey = false;
    },
    shiftKeyDown(state) {
      state.shiftKey = true;
    },
    shiftKeyUp(state) {
      state.shiftKey = false;
    },
    resetModifierKeys(state) {
      state.ctrlKey = false;
      state.shiftKey = false;
    },
  },
});

export const { ctrlKeyDown, ctrlKeyUp, shiftKeyDown, shiftKeyUp, resetModifierKeys } =
  modifierKeySlice.actions;

export const selectModifierKeys = (state: RootState) => state.modifierKey;

export default modifierKeySlice.reducer;
