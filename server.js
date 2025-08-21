const express = require("express");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Mount routes
app.use("/api/schools", schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
