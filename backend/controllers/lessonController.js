const jwt = require("jsonwebtoken");
const User = require("../model/User");

const JWT_SECRET = "supersecretkey";

const getProgress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      currentLesson: user.currentLesson,
      completedLessons: user.completedLessons
    });
  } catch (err) {
    console.error("Get progress error:", err);
    return res.status(500).json({ error: "Server error fetching progress" });
  }
};

const updateProgress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { currentLesson } = req.body;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    if (typeof currentLesson !== "number" || currentLesson < 1 || currentLesson > 5) {
      return res.status(400).json({ error: "currentLesson must be a number between 1 and 5" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.currentLesson = currentLesson;

    // auto-fill completed lessons before current lesson
    const completed = [];
    for (let i = 1; i < currentLesson; i++) {
      completed.push(i);
    }
    user.completedLessons = completed;

    await user.save();

    return res.json({
      success: true,
      currentLesson: user.currentLesson,
      completedLessons: user.completedLessons
    });
  } catch (err) {
    console.error("Update progress error:", err);
    return res.status(500).json({ error: "Server error updating progress" });
  }
};

const completeLesson = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { lessonNumber } = req.body;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    if (typeof lessonNumber !== "number" || lessonNumber < 1 || lessonNumber > 5) {
      return res.status(400).json({ error: "lessonNumber must be a number between 1 and 5" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.completedLessons.includes(lessonNumber)) {
      user.completedLessons.push(lessonNumber);
      user.completedLessons.sort((a, b) => a - b);
    }

    if (lessonNumber < 5 && user.currentLesson <= lessonNumber) {
      user.currentLesson = lessonNumber + 1;
    }

    if (lessonNumber === 5) {
      user.currentLesson = 5;
    }

    await user.save();

    return res.json({
      success: true,
      currentLesson: user.currentLesson,
      completedLessons: user.completedLessons
    });
  } catch (err) {
    console.error("Complete lesson error:", err);
    return res.status(500).json({ error: "Server error completing lesson" });
  }
};

module.exports = {
  getProgress,
  updateProgress,
  completeLesson
};