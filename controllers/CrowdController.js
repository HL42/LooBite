/**
 
Artifact Name: CrowdController
Description: Manages real-time crowd level reporting and retrieval.
Programmer: Zeyu (Methods) / Fuquan (Skeleton) */

const Restaurant = require("../models/Restaurant");
const CrowdReport = require("../models/CrowdReport");

class CrowdController {
  // System-level: Coordinates report creation and Restaurant status update [cite: 1179, 1189]
  static async submitCrowdReport(req, res) {
    // Zeyu: Implement logic here (Call updateCurrentCrowdLevel) [cite: 1179]
    try {
      const { restaurantId, studentId, crowdLevel } = req.body;

      if (!restaurantId || !studentId || !crowdLevel) {
        return res.status(400).json({
          message: "Missing required fields.",
        });
      }

      const validLevels = ["Quiet", "Moderate", "Busy"];
      if (!validLevels.includes(crowdLevel)) {
        return res.status(400).json({
          message: "Invalid crowd level.",
        });
      }

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({
          message: "Restaurant not found.",
        });
      }

      // create crowd report
      const newReport = new CrowdReport({
        reportId: Date.now().toString(),
        restaurantId,
        studentId,
        crowdLevel,
        timestamp: new Date(),
      });

      await newReport.save();

      // update restaurant crowd status
      if (restaurant.updateCurrentCrowdLevel) {
        await restaurant.updateCurrentCrowdLevel(crowdLevel);
      }

      return res.status(201).json({
        message: "Crowd report submitted successfully.",
        report: newReport,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while submitting crowd report.",
        error: error.message,
      });
    }
  }
// System-level: Centralized logic for multi-client requests [cite: 1181]
  static async getCurrentCrowdLevel(req, res) {
    try {
      const { restaurantId } = req.params;

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({
          message: "Restaurant not found.",
        });
      }

      return res.status(200).json({
        currentCrowdLevel: restaurant.currentCrowdLevel,
        crowdLastUpdated: restaurant.crowdLastUpdated,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while getting crowd level.",
        error: error.message,
      });
    }
  }
}

module.exports = CrowdController;