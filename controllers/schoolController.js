// controllers/schoolController.js
const pool = require("../db");

// Create school (POST)
exports.createSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const result = await pool.query(
      `INSERT INTO schools (name, address, latitude, longitude)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, address, latitude, longitude]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all schools (GET)
exports.getSchools = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
