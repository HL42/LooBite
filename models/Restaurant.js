/**
 * Artifact Name: Restaurant.js
 * Description: Domain entity that stores restaurant information, ratings, 
 * crowd status, and amenity tags. 
 * Programmer: Fuquan
 * Date: April 6, 2026 
 * Files Accessed: None (Internal Model)
 * * Variables:
 * - aggregateRating (Float): The overall rating of the restaurant.
 * - currentCrowdLevel (Enum): Real-time busyness level (Quiet, Moderate, Busy).
 * - amenityTags (Array): List of student-oriented tags (e.g., WiFi, Outlets).
 */

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  // Refined Attributes from Worksheet 5 
  aggregateRating: { type: Number, default: 0.0 }, 
  currentCrowdLevel: { 
    type: String, 
    enum: ['Quiet', 'Moderate', 'Busy'], 
    default: 'Quiet' 
  },
  crowdLastUpdated: { type: Date, default: Date.now },
  
  // Missing attribute from Worksheet 5 A1/B1 [cite: 1161, 1173]
  amenityTags: [{ type: String }] 
});

/**
 * Method: updateAggregateRating
 * Principle: A (Information Hiding) - Restaurant owns its rating data. [cite: 1146, 1222]
 * Scope: Object-level
 */
restaurantSchema.methods.updateAggregateRating = function(newRating) {
  this.aggregateRating = newRating; 
  return this.save();
};

/**
 * Method: updateCurrentCrowdLevel
 * Principle: A (Information Hiding) - Restaurant owns its crowd status.
 * Scope: Object-level 
 */
restaurantSchema.methods.updateCurrentCrowdLevel = function(level) {
  this.currentCrowdLevel = level; 
  this.crowdLastUpdated = Date.now();
  return this.save();
};

module.exports = mongoose.model('Restaurant', restaurantSchema);