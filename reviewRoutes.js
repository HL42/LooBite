/**
 
Artifact Name: reviewRoutes
Programmer: Zeyu
*/
const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");

router.post("/", ReviewController.submitReview);
router.put("/", ReviewController.editReview);

module.exports = router;