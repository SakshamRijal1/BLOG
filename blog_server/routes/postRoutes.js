const express = require("express");

const router = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  addComment,
  sharePost,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");


router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", protect, createPost);

router.delete("/:id", protect, deletePost);

router.post("/:id/like", protect, likePost);

router.post("/:id/comments", protect, addComment);

router.post("/:id/share", sharePost);


module.exports = router;