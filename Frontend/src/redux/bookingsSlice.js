import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch user bookings
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const response = await axios.get('/api/bookings/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

// Async action to create a booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const response = await axios.post('/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

// Initial state
const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  successMessage: null
};

// Create the bookings slice
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    clearBookingError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserBookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle createBooking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
        state.loading = false;
        state.successMessage = 'Booking created successfully';
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { 
  setCurrentBooking, 
  clearCurrentBooking,
  clearBookingError,
  clearSuccessMessage
} = bookingsSlice.actions;

export default bookingsSlice.reducer;