const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Protected routes - require authentication
router.get('/me', auth, userController.getUserProfile);
router.put('/update', auth, userController.updateUserProfile);
router.put('/change-password', auth, userController.changePassword);
router.delete('/delete', auth, userController.deleteAccount);

module.exports = router;
