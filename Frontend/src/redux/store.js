import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import authReducer from './authSlice';
import commentsReducer from './commentsSlice';
import uiReducer from './uiSlice';
import bookingsReducer from './bookingsSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    auth: authReducer,
    comments: commentsReducer,
    ui: uiReducer,
    bookings: bookingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true
});

export default store;