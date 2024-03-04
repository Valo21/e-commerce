import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi.ts";
import cartSlice from "./slices/cartSlice.ts";
import themeSlice from "./slices/themeSlice.ts";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authSlice from "@store/slices/authSlice.ts";
import { usersApi } from "@store/api/usersApi.ts";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    productsApi.reducerPath,
    usersApi.reducerPath,
    authSlice.name
  ]
}

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware)
      .concat(usersApi.middleware)
})

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch