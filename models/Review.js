/**
 * Artifact Name: Review.js
 * Description: Domain entity representing a student's review of a restaurant.
 * Programmer: Fuquan
 * Date: April 6, 2026
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true }, 
  commentText: { type: String }, 
  photoUrl: { type: String } 
});

module.exports = mongoose.model('Review', reviewSchema);