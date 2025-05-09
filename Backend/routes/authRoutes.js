const express = require('express');
const { registerUser, loginUser, getAuthenticatedUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/user
// @desc    Get authenticated user
// @access  Private
router.get('/user', auth, getAuthenticatedUser);

module.exports = router;