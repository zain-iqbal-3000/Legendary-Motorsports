import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch all cars
export const fetchAllCars = createAsyncThunk(
  'cars/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/cars');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cars');
    }
  }
);

// Async action to fetch a single car by ID
export const fetchCarById = createAsyncThunk(
  'cars/fetchById',
  async (carId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cars/${carId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch car details');
    }
  }
);

// Initial state
const initialState = {
  cars: [],
  currentCar: null,
  loading: false,
  error: null,
  filters: {
    make: null,
    priceRange: [0, 100000],
    year: null
  }
};

// Create the cars slice
const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    // Reducer for setting filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Reset filters
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    // Clear errors
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllCars
      .addCase(fetchAllCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchCarById
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentCar = null; // Clear previous car data
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { setFilters, resetFilters, clearError } = carsSlice.actions;
export default carsSlice.reducer;