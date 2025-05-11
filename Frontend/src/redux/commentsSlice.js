import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch comments for a car
export const fetchCommentsByCar = createAsyncThunk(
  'comments/fetchCommentsByCar',
  async (carId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/comments/car/${carId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

// Async action to add a new comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ carId, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/comments/`, comment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

// Initial state
const initialState = {
  comments: [],
  loading: false,
  error: null,
  successMessage: null
};

// Create the comments slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
    clearCommentsError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCommentsByCar
      .addCase(fetchCommentsByCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByCar.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchCommentsByCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle addComment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload); // Add the new comment to the array
      });
  }
});

export const { clearComments, clearCommentsError, clearSuccessMessage } = commentsSlice.actions;
export default commentsSlice.reducer;