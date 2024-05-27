
import { configureStore, combineReducers, Tuple } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterSlice from '../reducerSlices/counterSlice';
import boxSlice from '../reducerSlices/boxSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  box: boxSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: () =>new Tuple (logger),
});

export const persistor = persistStore(store);
export default store;
