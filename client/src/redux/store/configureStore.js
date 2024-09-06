
import { configureStore, combineReducers, Tuple } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterSlice from '../reducerSlices/counterSlice';
import boxSlice from '../reducerSlices/boxSlice';
import formSlice from '../reducerSlices/formSlice';
import navbarSlice from '../reducerSlices/navbarSlice';
import doctorSlice from '../reducerSlices/doctorSlice';
import dashboardSlice from '../reducerSlices/dashboardSlice';
import adminSlice from '../reducerSlices/adminsSlice';



const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  box: boxSlice,
  form:formSlice,
  navbar:navbarSlice,
  doctor:doctorSlice,
  Dashboard:dashboardSlice,
  admin:adminSlice,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: () =>new Tuple (logger),
});

export const persistor = persistStore(store);
export default store;
