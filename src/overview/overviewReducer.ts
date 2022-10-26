import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

interface OverviewState {
  isOpen: boolean;
}

const initialState: OverviewState = {
  isOpen: false,
};

const overviewSlice = createSlice({
  name: "Overview",
  initialState: initialState,
  reducers: {
    openOverview(state) {
      state.isOpen = true;
    },
    closeOverview(state) {
      state.isOpen = false;
    },
  },
});

export const { openOverview, closeOverview } = overviewSlice.actions;

export const selectOverviewIsOpen = (state: RootState) =>
  state.overview.isOpen;

export default overviewSlice.reducer;
