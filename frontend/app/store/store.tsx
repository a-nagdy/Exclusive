import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  // Ensure no non-serializable values are included
  serialize: true,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer);
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["user.someNonSerializableField"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
