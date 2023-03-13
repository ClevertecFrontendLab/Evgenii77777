import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categoryReducer } from './categories/categories-reducer';
import { booksReducer } from './thunk/reducers/get-all-books-reducer';
import { bookReducer } from './thunk/reducers/get-book-reducer';
import { categoriesReducer } from './thunk/reducers/get-categories-reducer';
import { newUserReducer } from './thunk/reducers/post-new-user-reducer';
import { userReducer } from './user/user-reducer';

const rootReducer = combineReducers({
  categories: categoriesReducer.reducer,
  books: booksReducer.reducer,
  book: bookReducer.reducer,
  category: categoryReducer,
  user: userReducer,
  newUser: newUserReducer.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
