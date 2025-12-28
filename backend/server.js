const userRoutes = require("./routes/userRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const postRoutes = require("./routes/postRoutes");


require("dotenv").config();

const app = express();
// Serve frontend static files
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../frontend")));


app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


app.get("/", (req, res) => {
  res.status(200).json({ message: "CampusConnect API is running 🚀" });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
