import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../api/api';

export const getAllBooks = createAsyncThunk('allBooks/getAllBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('https://strapi.cleverland.by/api/books');

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
