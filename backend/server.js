const userRoutes = require("./routes/userRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");              // 👈 add
const postRoutes = require("./routes/postRoutes");

require("dotenv").config();

const app = express();

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve frontend + uploads
app.use("/uploads", express.static(uploadsDir));
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", postRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
