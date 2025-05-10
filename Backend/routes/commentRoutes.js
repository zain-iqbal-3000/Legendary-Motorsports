const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create a new comment/review
router.post('/', auth, commentController.createComment);

// Get all comments for a car
router.get('/car/:carId', commentController.getCarComments);

// Get user's comments
router.get('/user/:userId', auth, commentController.getUserComments);

// Update comment (user can edit their own comment)
router.put('/:commentId', auth, commentController.updateComment);

// Delete comment (user can delete their own comment)
router.delete('/:commentId', auth, commentController.deleteComment);

// Moderate comment (admin only) - approve or reject
router.patch('/:commentId/moderate', [auth, admin], commentController.moderateComment);

// Get all pending comments (admin only)
router.get('/pending', [auth, admin], commentController.getPendingComments);

module.exports = router;
