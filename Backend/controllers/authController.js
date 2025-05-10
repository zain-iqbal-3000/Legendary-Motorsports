const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
exports.registerUser = async (req, res) => {
  // Log the request body for debugging
  console.log('Registration request body:', req.body);
  
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    // Validate required fields manually for clearer errors
    if (!firstName || !lastName) {
      return res.status(400).json({ 
        msg: 'First name and last name are required' 
      });
    }
    
    if (!email || !password) {
      return res.status(400).json({ 
        msg: 'Email and password are required' 
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create the user
    user = new User({ 
      firstName, 
      lastName, 
      email, 
      password, 
      phoneNumber: phoneNumber || '' 
    });
    
    // Save user to database
    await user.save();

    const token = generateToken(user);
    
    // Return both token and user data (excluding password)
    res.status(201).json({ 
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        role: user.role
      }
    });
  } catch (err) {
    // Improved error reporting for validation errors
    if (err.name === 'ValidationError') {
      console.error('Validation error:', err.message);
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ msg: messages.join(', ') });
    }
    console.error('Server error during registration:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Authenticated User
exports.getAuthenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};