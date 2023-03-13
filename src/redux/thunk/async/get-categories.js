import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../api/api';

export const getAllCategories = createAsyncThunk('allCategories/getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('https://strapi.cleverland.by/api/categories');

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
