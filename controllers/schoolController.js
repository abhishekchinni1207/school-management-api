const db = require("../db");

// Add a new school
exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List schools sorted by distance
exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const [schools] = await db.query("SELECT * FROM schools");

    const sortedSchools = schools.map(school => {
      const distance = Math.sqrt(
        Math.pow(latitude - school.latitude, 2) +
        Math.pow(longitude - school.longitude, 2)
      );
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
