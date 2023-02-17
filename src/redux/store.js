import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categoryReducer } from './categories/categories-reducer';
import { booksReducer } from './thunk/reducers/get-all-books-reducer';
import { bookReducer } from './thunk/reducers/get-book-reducer';
import { categoriesReducer } from './thunk/reducers/get-categories-reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  categories: categoriesReducer.reducer,
  books: booksReducer.reducer,
  book: bookReducer.reducer,
  category:categoryReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
