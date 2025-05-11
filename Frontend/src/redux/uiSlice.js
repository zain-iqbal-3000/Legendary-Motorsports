import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  darkMode: true,
  notification: {
    open: false,
    message: '',
    type: 'info'
  }
};

// Create UI slice for general UI state
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    showNotification: (state, action) => {
      state.notification = {
        open: true,
        message: action.payload.message,
        type: action.payload.type || 'info'
      };
    },
    hideNotification: (state) => {
      state.notification.open = false;
    }
  }
});

export const { toggleDarkMode, showNotification, hideNotification } = uiSlice.actions;
export default uiSlice.reducer;