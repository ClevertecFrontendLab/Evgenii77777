/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { addCategory, addPath } from './categories-actions';

export const categoryReducer = createReducer(
  {
    category: 'Все книги',
    path: '',
  },
  (builder) => {
    builder.addCase(addCategory, (state, { payload }) => {
      state.category = payload;
    });
    builder.addCase(addPath, (state, { payload }) => {
      state.path = payload;
    });
  }
);
