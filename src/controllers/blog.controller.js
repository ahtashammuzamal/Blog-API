import { Blog } from "../models/blog.model.js";
import { isValidUpdate } from "../utils/is-valid-update.js";

// @desc Create blog
// @route POST /blogs
// @access Private (author, admin)
export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blog = await Blog.create({
      title,
      description,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc Get all blogs
// @route GET /blogs
// @access Public
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("author");
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc Get single blog
// @route GET /blogs/:id
// @access Public
export const getSingleBlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const blog = await Blog.findById({ _id }).populate("author");
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc Update blog
// @route PATCH /blogs/:id
// @access Private (author, admin)
export const updateBlog = async (req, res) => {
  try {
    const allowedUpdates = ["title", "description"];
    if (!isValidUpdate(allowedUpdates, req.body)) {
      return res.status(400).json({
        success: false,
        message: "Invalid update",
      });
    }

    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, author: req.user._id };

    const blog = await Blog.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    }).populate("author");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc Delete blog
// @route DELETE /blogs/:id
// @access Private (author, admin)
export const deleteBlog = async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, author: req.user._id };

    const blog = await Blog.findOneAndDelete(filter).populate("author");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.json({
      success: true,
      message: "Blog post successfully delete",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
