import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk actions for cars
export const fetchAllCars = createAsyncThunk(
  'cars/fetchAllCars',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/cars');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars');
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (carId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cars/${carId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch car');
    }
  }
);

const initialState = {
  cars: [],
  currentCar: null,
  loading: false,
  error: null
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearCarError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentCar = null;
      });
  }
});

export const { clearCarError } = carsSlice.actions;
export default carsSlice.reducer;