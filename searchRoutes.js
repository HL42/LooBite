/**
 
Artifact Name: searchRoutes
Programmer: Zeyu
*/
const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/SearchController");

router.get("/tag", SearchController.searchByTag);
router.get("/criteria", SearchController.searchByCriteria);

module.exports = router;