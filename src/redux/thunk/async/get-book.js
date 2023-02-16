import { createAsyncThunk } from '@reduxjs/toolkit';

export const getBook = createAsyncThunk('book/getBook', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://strapi.cleverland.by/api/books/${id}`);

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
