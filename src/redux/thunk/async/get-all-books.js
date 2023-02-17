import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllBooks = createAsyncThunk('allBooks/getAllBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://strapi.cleverland.by/api/books');

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
