import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllBooks = createAsyncThunk('allBooks/getAllBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://strapi.cleverland.by/api/books');

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
