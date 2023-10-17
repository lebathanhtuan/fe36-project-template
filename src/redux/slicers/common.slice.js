import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const { theme } = action.payload;
      state.theme = theme;
    },
  },
});

export const { setTheme, setFilterParams, clearFilterParams } =
  commonSlice.actions;

export default commonSlice.reducer;
