/**
 * Artifact Name: ReviewController
 * Description: Handles system-level workflows for review submission and editing.
 * Programmer: Zeyu (Methods) / Fuquan (Skeleton) 
 */

const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");

class ReviewController {
   // System-level: Handles review submission and coordinates with Restaurant [cite: 1173, 1187]
  static async submitReview(req, res) {
    try {
      const { restaurantId, studentId, rating, commentText, photoUrl } = req.body;

      if (!restaurantId || !studentId || rating == null || !commentText) {
        return res.status(400).json({
          message: "Missing required fields.",
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          message: "Rating must be between 1 and 5.",
        });
      }

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({
          message: "Restaurant not found.",
        });
      }

      const newReview = new Review({
        restaurantId,
        studentId,
        rating,
        commentText,
        photoUrl: photoUrl || "",
      });

      await newReview.save();

      if (restaurant.updateAggregateRating) {
        await restaurant.updateAggregateRating(rating);
      }

      return res.status(201).json({
        message: "Review submitted successfully.",
        review: newReview,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while submitting review.",
        error: error.message,
      });
    }
  }
 // System-level: Handles editing existing reviews [cite: 1173, 1187]
  static async editReview(req, res) {
    // Zeyu: Implement logic here [cite: 1179]
    try {
      const { reviewId, rating, commentText, photoUrl } = req.body;

      if (!reviewId) {
        return res.status(400).json({
          message: "Review ID is required.",
        });
      }

      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({
          message: "Review not found.",
        });
      }

      if (rating != null) {
        if (rating < 1 || rating > 5) {
          return res.status(400).json({
            message: "Rating must be between 1 and 5.",
          });
        }
        review.rating = rating;
      }

      if (commentText !== undefined) {
        review.commentText = commentText;
      }

      if (photoUrl !== undefined) {
        review.photoUrl = photoUrl;
      }

      await review.save();

      const restaurant = await Restaurant.findById(review.restaurantId);
      if (restaurant && restaurant.updateAggregateRating && rating != null) {
        await restaurant.updateAggregateRating(rating);
      }

      return res.status(200).json({
        message: "Review updated successfully.",
        review,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while editing review.",
        error: error.message,
      });
    }
  }
}

module.exports = ReviewController;