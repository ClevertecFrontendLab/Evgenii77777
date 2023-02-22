import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllCategories = createAsyncThunk('allCategories/getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://strapi.cleverland.by/api/categories');

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
