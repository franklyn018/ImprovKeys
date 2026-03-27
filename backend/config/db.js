const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://flu018_db_user:Mississippi@clank.boydpzn.mongodb.net/?appName=Clank"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;