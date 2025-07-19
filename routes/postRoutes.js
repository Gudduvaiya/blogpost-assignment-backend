const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  addPostComments,
  getAllMyPosts
} = require("../controllers/postController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create-post", verifyToken, createPost);
router.get("/get-my-posts", verifyToken, getAllMyPosts);
router.get("/get-all-posts", verifyToken, getAllPosts);
router.put("/update-post/:id", verifyToken, updatePost);
router.delete("/delete-post/:id", verifyToken, deletePost);
router.put("/add-cooment/:postId", verifyToken, addPostComments);

module.exports = router;
