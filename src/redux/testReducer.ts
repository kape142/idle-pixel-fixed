import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface TestState {
  foo: string;
  bar: number;
}

const initialState: TestState = {
  foo: "bonn",
  bar: 0,
};

export const testSlice = createSlice({
  name: "test",
  initialState: initialState,
  reducers: {
    testFoo(state, action: PayloadAction<string>) {
      state.foo = action.payload;
    },
    testBar(state, action: PayloadAction<number>) {
      state.bar += action.payload;
    },
  },
});

export const { testFoo, testBar } = testSlice.actions;

export const selectTestFoo = (state: RootState) => state.test.foo;
export const selectTestBar = (state: RootState) => state.test.bar;

export default testSlice.reducer;
