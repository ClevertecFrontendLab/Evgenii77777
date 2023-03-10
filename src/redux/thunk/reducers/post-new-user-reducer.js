/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { forgotPassword, getUser, postNewUser, resetPassword } from '../async/post-new-user';

export const newUserReducer = createSlice({
  name: 'newUser',
  initialState: {
    newUser: {},
    jwt: '',
    loading: false,
    loadingRegister: false,
    error: false,
    errorRegister: false,
    errorForgot: false,
    errorReset: false,
    status: '',
    statusRegister: '',
    statusForgot: '',
    statusReset: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postNewUser.pending, (state) => {
      state.loadingRegister = true;
      state.errorRegister = false;
    });
    builder.addCase(postNewUser.fulfilled, (state, action) => {
      state.loadingRegister = false;
      state.errorRegister = false;
      state.newUser = action.payload;
      state.jwt = action.payload.jwt;
    });
    builder.addCase(postNewUser.rejected, (state, action) => {
      state.errorRegister = true;
      state.loadingRegister = false;
      state.statusRegister = action.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.jwt = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.errorForgot = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.errorForgot = false;
      state.statusForgot = action.payload;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.errorForgot = true;
      state.loading = false;
      state.statusForgot = action.payload;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.errorReset = false;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.errorReset = false;
      state.jwt = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.errorReset = true;
      state.loading = false;
      state.status = action.payload;
    });
  },
});
