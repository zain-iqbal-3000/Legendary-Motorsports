const express = require('express');
const connectDB = require('./config/db');
const carRoute = require('./routes/carRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors(
  {
    origin: 'http://localhost:5173',

    // methods: ['GET', 'POST', 'PUT', 'DELETE'],

    // allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'Accept']
  }
));
app.use(express.json({ extended: false }));

app.use('/api/cars', carRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));