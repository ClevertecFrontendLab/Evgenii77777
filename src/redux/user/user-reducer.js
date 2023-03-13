/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { addNewPassword, addNewUser, addUser } from './user-actions';

export const userReducer = createReducer({ user: '', newPassword: '' }, (builder) => {
  builder.addCase(addUser, (state, { payload }) => {
    state.user = { ...state.user, ...payload };
  });
  builder.addCase(addNewUser, (state, { payload }) => {
    state.user = { ...payload };
  });
  builder.addCase(addNewPassword, (state, { payload }) => {
    state.newPassword = { ...payload };
  });
});
