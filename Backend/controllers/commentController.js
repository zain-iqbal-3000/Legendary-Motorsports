const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');
const Hypercar = require('../models/hypercarSchema');
const Booking = require('../models/bookingSchema');
const mongoose = require('mongoose');

// Create a new comment/review
exports.createComment = async (req, res) => {
  try {
    const { userId, carId, bookingId, rating, content, images } = req.body;
    
    // Validate required fields
    if (!userId || !carId || !bookingId || !rating || !content) {
      return res.status(400).json({ message: 'Missing required review information' });
    }

    // Verify the booking exists and belongs to the user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: 'User not authorized to review this booking' });
    }
    
    // Check if user has already commented on this booking
    const existingComment = await Comment.findOne({ booking: bookingId });
    if (existingComment) {
      return res.status(400).json({ message: 'You have already submitted a review for this booking' });
    }
    
    // Create the new comment
    const newComment = new Comment({
      user: userId,
      car: carId,
      booking: bookingId,
      rating,
      content,
      images: images || []
    });
    
    const savedComment = await newComment.save();
    
    // Update user's comments array
    await User.findByIdAndUpdate(userId, {
      $push: { comments: savedComment._id }
    });
    
    // Update car's comments array and recalculate average rating
    const car = await Hypercar.findById(carId);
    car.comments.push(savedComment._id);
    
    // Calculate new average rating
    const allCarComments = await Comment.find({ car: carId, status: 'APPROVED' });
    
    if (allCarComments.length > 0) {
      const totalRating = allCarComments.reduce((sum, comment) => sum + comment.rating, 0);
      car.averageRating = totalRating / allCarComments.length;
      car.totalReviews = allCarComments.length;
    }
    
    await car.save();
    
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all comments for a car
exports.getCarComments = async (req, res) => {
  try {
    const { carId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: 'Invalid car ID' });
    }
    
    const comments = await Comment.find({ 
      car: carId,
      status: 'APPROVED' 
    })
    .populate('user', 'firstName lastName profileImage')
    .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching car comments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's comments
exports.getUserComments = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    const comments = await Comment.find({ user: userId })
      .populate('car', 'make model year images')
      .populate('booking', 'startDate endDate')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update comment (user can edit their own comment)
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { rating, content, images } = req.body;
    const userId = req.user.id; // Assuming user ID comes from JWT token
    
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }
    
    // Find the comment and check ownership
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'User not authorized to edit this comment' });
    }
    
    // Update fields
    if (rating) comment.rating = rating;
    if (content) comment.content = content;
    if (images) comment.images = images;
    
    // Reset approval status since it was edited
    comment.status = 'PENDING';
    
    const updatedComment = await comment.save();
    
    // Recalculate car average rating
    const carId = comment.car;
    const allCarComments = await Comment.find({ car: carId, status: 'APPROVED' });
    
    if (allCarComments.length > 0) {
      const car = await Hypercar.findById(carId);
      const totalRating = allCarComments.reduce((sum, comment) => sum + comment.rating, 0);
      car.averageRating = totalRating / allCarComments.length;
      await car.save();
    }
    
    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete comment (user can delete their own comment)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id; // Assuming user ID comes from JWT token
    
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }
    
    // Find the comment and check ownership
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'User not authorized to delete this comment' });
    }
    
    // Save car ID before deleting comment
    const carId = comment.car;
    
    // Remove comment
    await Comment.findByIdAndDelete(commentId);
    
    // Remove reference from user
    await User.findByIdAndUpdate(userId, {
      $pull: { comments: commentId }
    });
    
    // Remove reference from car and recalculate average rating
    const car = await Hypercar.findByIdAndUpdate(carId, {
      $pull: { comments: commentId }
    }, { new: true });
    
    // Recalculate car average rating
    const allCarComments = await Comment.find({ car: carId, status: 'APPROVED' });
    
    if (allCarComments.length > 0) {
      const totalRating = allCarComments.reduce((sum, comment) => sum + comment.rating, 0);
      car.averageRating = totalRating / allCarComments.length;
      car.totalReviews = allCarComments.length;
    } else {
      car.averageRating = 0;
      car.totalReviews = 0;
    }
    
    await car.save();
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Moderate comment (admin only) - approve or reject
exports.moderateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { status, adminResponse } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }
    
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be APPROVED or REJECTED' });
    }
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Update comment status
    comment.status = status;
    if (adminResponse) {
      comment.adminResponse = {
        content: adminResponse,
        date: new Date()
      };
    }
    
    const updatedComment = await comment.save();
    
    // Recalculate car average rating if comment is approved/rejected
    const carId = comment.car;
    const car = await Hypercar.findById(carId);
    
    const allApprovedComments = await Comment.find({ car: carId, status: 'APPROVED' });
    
    if (allApprovedComments.length > 0) {
      const totalRating = allApprovedComments.reduce((sum, comment) => sum + comment.rating, 0);
      car.averageRating = totalRating / allApprovedComments.length;
      car.totalReviews = allApprovedComments.length;
    } else {
      car.averageRating = 0;
      car.totalReviews = 0;
    }
    
    await car.save();
    
    res.json(updatedComment);
  } catch (error) {
    console.error('Error moderating comment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all pending comments (admin only)
exports.getPendingComments = async (req, res) => {
  try {
    const pendingComments = await Comment.find({ status: 'PENDING' })
      .populate('user', 'firstName lastName email')
      .populate('car', 'make model year')
      .populate('booking', 'startDate endDate')
      .sort({ createdAt: -1 });
      
    res.json(pendingComments);
  } catch (error) {
    console.error('Error fetching pending comments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
