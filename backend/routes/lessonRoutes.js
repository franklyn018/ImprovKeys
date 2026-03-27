const express = require("express");
const router = express.Router();
const {
  getProgress,
  updateProgress,
  completeLesson
} = require("../controllers/lessonController");

router.get("/progress", getProgress);
router.post("/progress", updateProgress);
router.post("/progress/complete", completeLesson);

module.exports = router;