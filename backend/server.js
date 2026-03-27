const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require("./routes/lessonRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes
app.use("/", authRoutes);
app.use("/", lessonRoutes);

// Start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// POST /register

// POST /login

// GET /progress
// Authorization: Bearer <token>

// POST /progress
// Authorization: Bearer <token>
// Content-Type: application/json