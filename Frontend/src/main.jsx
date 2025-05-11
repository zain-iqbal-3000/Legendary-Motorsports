import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';

// Configure Axios for debugging
const API_BASE_URL = 'http://localhost:5000'; // Make sure this matches your backend URL

console.log(`Setting up axios with base URL: ${API_BASE_URL}`);
axios.defaults.baseURL = API_BASE_URL;

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Axios Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.method !== 'get' ? config.data : undefined,
    });
    return config;
  },
  (error) => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  },
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error('Axios Response Error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return Promise.reject(error);
  },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
