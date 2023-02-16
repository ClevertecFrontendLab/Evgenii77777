/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getAllCategories } from '../async/get-categories';

export const categoriesReducer = createSlice({
  name: 'allCategories',
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});
