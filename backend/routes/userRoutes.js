const multer = require("multer");
const path = require("path");

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMyProfile,
  updateProfile,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");
// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
  const ext = path.extname(file.originalname);
  cb(null, Date.now() + ext);
},

});
const upload = multer({ storage });


// Auth
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// ✅ My Profile
router.get("/users/me", protect, getMyProfile);
router.put("/users/me", protect, upload.single("profilePic"), updateProfile);

module.exports = router;


