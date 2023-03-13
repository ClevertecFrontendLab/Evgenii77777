import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../api/api';

export const getBook = createAsyncThunk('book/getBook', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`https://strapi.cleverland.by/api/books/${id}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
