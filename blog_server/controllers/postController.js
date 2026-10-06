const Post = require("../models/Post");


// Calculate reading time
const calculateReadTime = (topics) => {
  let totalWords = 0;

  topics.forEach((topic) => {
    topic.content.forEach((item) => {
      if (item.type === "paragraph" && item.text) {
        totalWords += item.text.trim().split(/\s+/).length;
      }
    });
  });

  return Math.max(1, Math.ceil(totalWords / 200));
};


// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE POST
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email bio")
      .populate("comments.user", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CREATE POST
const createPost = async (req, res) => {
  try {
    const {
      title,
      coverImage,
      topics,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!topics || topics.length === 0) {
      return res.status(400).json({
        message: "At least one topic is required",
      });
    }

    const readTime = calculateReadTime(topics);

    const post = await Post.create({
      title,
      coverImage: coverImage || "",
      topics,
      readTime,
      author: req.user.id,
    });

    const populatedPost = await Post.findById(post._id)
      .populate("author", "name email");

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE POST
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own post",
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LIKE / UNLIKE
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      liked: !alreadyLiked,
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD COMMENT
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user.id,
      text: text.trim(),
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "name email bio")
      .populate("comments.user", "name email");

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// SHARE
const sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.shares += 1;

    await post.save();

    res.json({
      shares: post.shares,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  addComment,
  sharePost,
};