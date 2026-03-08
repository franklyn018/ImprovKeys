const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://flu018_db_user:Mississippi@clank.boydpzn.mongodb.net/?appName=Clank"
)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  currentLesson: { type: Number, default: 1 } // default lesson 1
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => res.send("Backend is running!")); // test route

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      "supersecretkey",
      { expiresIn: "1h" }
    );

    return res.json({
      message: "User registered successfully!",
      token,
      email: newUser.email
    });

  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error during registration" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id },
      "supersecretkey",
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      email: user.email
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error during login" });
  }
});

app.get("/progress", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, "supersecretkey");
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ currentLesson: user.currentLesson });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching progress" });
  }
});

app.post("/progress", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { currentLesson } = req.body;
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, "supersecretkey");
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.currentLesson = currentLesson;
    await user.save();

    res.json({ success: true, currentLesson: user.currentLesson });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating progress" });
  }
});

// Start server
const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));