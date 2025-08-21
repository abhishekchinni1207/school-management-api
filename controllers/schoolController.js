const pool = require("../db");

// GET all schools
exports.getSchools = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE new school
exports.createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const result = await pool.query(
      "INSERT INTO schools (name, address) VALUES ($1, $2) RETURNING *",
      [name, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
