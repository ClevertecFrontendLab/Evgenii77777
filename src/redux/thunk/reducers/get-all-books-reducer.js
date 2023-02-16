/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getAllBooks } from '../async/get-all-books';

export const booksReducer = createSlice({
  name: 'allBooks',
  initialState: {
    allBooks: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.allBooks = action.payload;
    });
    builder.addCase(getAllBooks.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});
