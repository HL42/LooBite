/**
 * Artifact Name: ReviewController
 * Description: Handles system-level workflows for review submission and editing.
 * Programmer: Zeyu (Methods) / Fuquan (Skeleton) 
 */

const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');

class ReviewController {
    // System-level: Handles review submission and coordinates with Restaurant [cite: 1173, 1187]
    static async submitReview(req, res) {
        // Zeyu: Implement logic here (Validation, Creation, updateAggregateRating call) [cite: 1179]
    }

    // System-level: Handles editing existing reviews [cite: 1173, 1187]
    static async editReview(req, res) {
        // Zeyu: Implement logic here [cite: 1179]
    }
}

module.exports = ReviewController;