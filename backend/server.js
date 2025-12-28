const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const app = express();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 uploads folder created");
}

// Serve uploaded images
app.use("/uploads", express.static(uploadDir));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "CampusConnect API is running 🚀" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
