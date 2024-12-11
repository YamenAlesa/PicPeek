const Post = require("../models/postModels");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, imageUrl, description } = req.body;

    const newPost = new Post({
      title,
      imageUrl,
      description,
    });

    const post = await newPost.save();

    if (!post) {
      return res.status(400).json({ message: "Post not created" });
    }
    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postToDelete = await Post.findByIdAndDelete(req.params.id);

    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res
      .status(200)
      .json({ message: "Post deleted successfully", postToDelete });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, description } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title || post.title;
    post.imageUrl = imageUrl || post.imageUrl;
    post.description = description || post.description;

    const updatedPost = await post.save();
    return res
      .status(200)
      .json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
};
