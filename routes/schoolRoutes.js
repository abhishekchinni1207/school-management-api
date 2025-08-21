const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");

// GET all schools
router.get("/", schoolController.getSchools);

// POST new school
router.post("/", schoolController.createSchool);

module.exports = router;
