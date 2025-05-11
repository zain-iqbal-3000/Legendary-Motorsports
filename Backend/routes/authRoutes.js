const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/userSchema'); // Adjust the path as necessary
require('dotenv').config();

// @route   GET api/users/test-connection
// @desc    Test endpoint to check connectivity
// @access  Public
router.get('/test-connection', (req, res) => {
  res.json({ success: true, message: 'API is connected successfully' });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    console.log('Registering user');
    console.log('Registration request received:', req.body);

    // Use correct field names
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please provide first name, last name, email, and password' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log(`User with email ${email} already exists`);
      return res.status(400).json({ message: 'User already exists with this email address' });
    }

    // Create new user with plain password - let the schema middleware handle hashing
    user = new User({
      firstName,
      lastName,
      email,
      password, // IMPORTANT: Don't hash here, let schema middleware do it
      phoneNumber: phoneNumber || '',
    });

    await user.save();
    console.log('User registered successfully:', user.id);

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
          }
        });
      }
    );
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log(`User found: ${user.firstName} ${user.lastName}`);
    
    // Add debug logging to see password details
    console.log('Stored hashed password length:', user.password.length);
    console.log('Password from request length:', password.length);
    
    // Try using the schema method first
    let isMatch = false;
    if (typeof user.comparePassword === 'function') {
      console.log('Using schema comparePassword method');
      isMatch = await user.comparePassword(password);
    } else {
      console.log('Using direct bcrypt.compare');
      isMatch = await bcrypt.compare(password, user.password);
    }
    
    console.log('Password verification result:', isMatch ? 'match' : 'no match');

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // At this point password matched
    console.log('Authentication successful for user:', user.email);

    // Create token payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });

    // Create a user object without the password to return to client
    const userToReturn = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    };

    res.json({ token, user: userToReturn });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { displayName, email, phoneNumber, address, city, country } = req.body;
    const [firstName, lastName] = (displayName || '').split(' ');

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address.street = address || user.address.street;
    user.address.city = city || user.address.city;
    user.address.country = country || user.address.country;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/:id/password
// @desc    Update user password
// @access  Private
router.put('/:id/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/:id/notifications
// @desc    Update user notification preferences
// @access  Private
router.put('/:id/notifications', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

// Export router
module.exports = router;