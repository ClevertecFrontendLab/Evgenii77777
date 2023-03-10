import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../api/api';

const baseURL = 'https://strapi.cleverland.by/api';

export const postNewUser = createAsyncThunk('user/postNewUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/auth/local/register`, user);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getUser = createAsyncThunk('user/getUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/auth/local`, user);

    localStorage.setItem('JWT', response.data?.jwt);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.status);
  }
});

export const forgotPassword = createAsyncThunk('user/postForgPass', async (email, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/auth/forgot-password`, email);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.status);
  }
});

export const resetPassword = createAsyncThunk('user/postResetPass', async (email, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/auth/reset-password`, email);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.status);
  }
});
