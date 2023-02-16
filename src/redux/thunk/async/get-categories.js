import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllCategories = createAsyncThunk('allCategories/getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://strapi.cleverland.by/api/categories');

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
