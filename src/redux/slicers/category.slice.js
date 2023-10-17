import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // getCategoryList
    getCategoryListRequest: (state, action) => {
      state.categoryList.loading = true;
      state.categoryList.error = null;
    },
    getCategoryListSuccess: (state, action) => {
      const { data } = action.payload;
      state.categoryList.data = data;
      state.categoryList.loading = false;
    },
    getCategoryListFailure: (state, action) => {
      const { error } = action.payload;
      state.categoryList.loading = false;
      state.categoryList.error = error;
    },
  },
});

export const {
  getCategoryListRequest,
  getCategoryListSuccess,
  getCategoryListFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
