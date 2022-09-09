import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

interface ActivityLogState {
  isOpen: boolean;
}

const initialState: ActivityLogState = {
  isOpen: false,
};

const activityLogSlice = createSlice({
  name: "Activity Log",
  initialState: initialState,
  reducers: {
    openActivityLog(state) {
      state.isOpen = true;
    },
    closeActivityLog(state) {
      state.isOpen = false;
    },
  },
});

export const { openActivityLog, closeActivityLog } = activityLogSlice.actions;

export const selectActivityLogIsOpen = (state: RootState) =>
  state.activityLog.isOpen;

export default activityLogSlice.reducer;
