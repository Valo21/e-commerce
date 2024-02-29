// @ts-ignore

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi";
import cartSlice from "./slices/cartSlice";
import themeSlice from "./slices/themeSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authSlice from "@store/slices/authSlice";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    productsApi.reducerPath,
    authSlice.name
  ]
}

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

// @ts-expect-error
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(productsApi.middleware)
})

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch