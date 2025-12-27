const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  likePost,
  addComment,
  editPost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middlewares/authMiddleware");

// Posts
router.post("/users/posts", protect, createPost);
router.get("/users/posts", protect, getPosts);

// Like / Unlike
router.put("/users/posts/:id/like", protect, likePost);

// ✅ Add Comment
router.post("/users/posts/:id/comment", protect, addComment);

// ✅ Edit Post
router.put("/users/posts/:id", protect, editPost);

// ✅ Delete Post
router.delete("/users/posts/:id", protect, deletePost);

module.exports = router;





