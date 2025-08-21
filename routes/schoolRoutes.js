const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");

// Routes
router.post("/schools", schoolController.createSchool);
router.get("/schools", schoolController.getSchools);

module.exports = router;
