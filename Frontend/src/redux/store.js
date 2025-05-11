import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import carsReducer from './carsSlice';
import commentsReducer from './commentsSlice';
import bookingsReducer from './bookingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    cars: carsReducer,
    comments: commentsReducer,
    bookings: bookingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;