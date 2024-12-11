const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", postController.getAllPosts);

router.post("/", postController.createPost);

router.get("/:id", postController.getPostById);

router.delete("/:id", postController.deletePost);

router.put("/:id", postController.updatePost);

module.exports = router;
