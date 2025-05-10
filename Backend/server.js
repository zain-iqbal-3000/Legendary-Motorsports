const express = require('express');
const connectDB = require('./config/db');
const carRoute = require('./routes/carRoute');
const cors = require('cors');
const userRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors(
  {
    origin: 'http://localhost:5173',

    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'Accept']
  }
));
app.use(express.json({ extended: false }));

app.use('/api/cars', carRoute);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/comments', commentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));