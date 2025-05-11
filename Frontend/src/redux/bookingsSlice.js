import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to create a new booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

// Async action to fetch user bookings
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`api/bookings/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

// Initial state
const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  success: false
};

const mapBookingData = (booking) => {
  return {
    id: booking._id,
    carId: booking.car._id,
    car: {
      id: booking.car._id,
      name: `${booking.car.make} ${booking.car.model}`,
      year: booking.car.year,
      image: booking.car.images[0],
      type: booking.car.specifications?.engine?.type || 'N/A'
    },
    pickup: {
      location: booking.pickupLocation,
      date: booking.startDate
    },
    dropoff: {
      location: booking.dropoffLocation,
      date: booking.endDate
    },
    price: booking.totalAmount,
    duration: `${Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days`,
    status: booking.status.toLowerCase(),
    requiresAction: booking.requiresAction,
    createdAt: booking.createdAt
  };
};

// Create the bookings slice
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    clearBookingSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle createBooking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchUserBookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.map(mapBookingData);
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { 
  clearBookingError, 
  clearBookingSuccess 
} = bookingsSlice.actions;

export default bookingsSlice.reducer;