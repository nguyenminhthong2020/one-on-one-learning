/* eslint-disable */
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginReducer from './slices/auth/loginSlice';
import themeReducer from './slices/setting/themeSlice';
import langReducer1 from "./slices/setting/langSlice1";
import searchTutorReducer from "./slices/tutor/searchSlice";
import moreTutorReducer from "./slices/tutor/moreSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //whitelist: ['theme', 'lang'],
  //blacklist: ['theme']
}
const reducers = combineReducers({
    auth: loginReducer,
    theme: themeReducer,
    lang: langReducer1,
    searchtutor: searchTutorReducer,
    moretutor: moreTutorReducer
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