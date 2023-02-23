import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBook = createAsyncThunk('book/getBook', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://strapi.cleverland.by/api/books/${id}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
