import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Session } from "../../types/session";

const initialState: Session = {
  token: "",
};

export const sessionSlice = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { updateToken } = sessionSlice.actions;

export default sessionSlice.reducer;
