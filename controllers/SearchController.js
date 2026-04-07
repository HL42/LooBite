/**
 
Artifact Name: SearchController
Description: Handles collection-level filtering and restaurant discovery.
Programmer: Zeyu (Methods) / Fuquan (Skeleton)*/

const Restaurant = require("../models/Restaurant");

class SearchController {
   // Collection-level: Filters restaurants by amenity tags [cite: 1173, 1181, 1189]
  static async searchByTag(req, res) {
    try {
      const { tag } = req.query;

      if (!tag) {
        return res.status(400).json({
          message: "Tag is required.",
        });
      }

      const restaurants = await Restaurant.find({
        amenityTags: tag,
      });

      return res.status(200).json({
        results: restaurants,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while searching by tag.",
        error: error.message,
      });
    }
  }

  static async searchByCriteria(req, res) {
    try {
      const { tag, crowdLevel, minRating } = req.query;

      const query = {};

      if (tag) {
        query.amenityTags = tag;
      }

      if (crowdLevel) {
        query.currentCrowdLevel = crowdLevel;
      }

      if (minRating) {
        query.aggregateRating = { $gte: Number(minRating) };
      }

      const restaurants = await Restaurant.find(query);

      return res.status(200).json({
        results: restaurants,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while searching by criteria.",
        error: error.message,
      });
    }
  }
}

module.exports = SearchController;