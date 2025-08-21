// controllers/schoolController.js
const pool = require('../db');

// Create school
exports.createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const result = await pool.query(
      "INSERT INTO schools (name, address) VALUES ($1, $2) RETURNING *",
      [name, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all schools
exports.getSchools = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
