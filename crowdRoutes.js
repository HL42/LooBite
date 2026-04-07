/**
 
Artifact Name: crowdRoutes
Programmer: Zeyu
*/
const express = require("express");
const router = express.Router();
const CrowdController = require("../controllers/CrowdController");

router.post("/", CrowdController.submitCrowdReport);
router.get("/:restaurantId", CrowdController.getCurrentCrowdLevel);

module.exports = router;