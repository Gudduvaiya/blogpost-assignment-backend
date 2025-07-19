const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, author: req.userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Post creation failed", details: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("comments.author", "name email");
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Fetching posts failed", details: err.message });
  }
};
exports.getAllMyPosts = async (req, res) => {
  try {
    //  const userId = mongoose.Types.ObjectId(req.userId);
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("comments.author", "name email");
      console.log(posts);
      
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Fetching posts failed", details: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Fetching post failed", details: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.json(post);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Updating post failed", details: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Deleting post failed", details: err.message });
  }
};

exports.addPostComments= async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = {
      text: req.body.text,
      author: req.userId,
    };
    const existingUser = await User.findOne({ _id:req.userId });

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: "Comment added successfully", comment:{...comment,author:existingUser} });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
    
  }
};
