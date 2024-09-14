
import { configureStore, combineReducers, Tuple } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formSlice from '../reducerSlices/formSlice';
import navbarSlice from '../reducerSlices/navbarSlice';
import doctorSlice from '../reducerSlices/doctorSlice';
import dashboardSlice from '../reducerSlices/dashboardSlice';
import appointmentSlice from '../reducerSlices/appointmentSlice';
import adminsSlice from '../reducerSlices/adminsSlice';
import caseSlice from '../reducerSlices/caseSlice';



const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  form:formSlice,
  navbar:navbarSlice,
  doctor:doctorSlice,
  Dashboard:dashboardSlice,
  admin:adminsSlice,
  appointments:appointmentSlice,
  case: caseSlice,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: () =>new Tuple (logger),
});

export const persistor = persistStore(store);
export default store;
