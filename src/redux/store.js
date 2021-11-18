/* eslint-disable */
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginReducer from './slices/auth/loginSlice';
import themeReducer from './slices/setting/themeSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //whitelist: [''],
  blacklist: ['theme']
}
const reducers = combineReducers({
    auth: loginReducer,
    theme: themeReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
const persistor = persistStore(store)
export { store, persistor }