/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getBook } from '../async/get-book';

export const bookReducer = createSlice({
  name: 'book',
  initialState: {
    book: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload;
    });
    builder.addCase(getBook.rejected, (state) => {
      state.error = true;
      state.book = [];
      state.loading = false;
    });
  },
});
