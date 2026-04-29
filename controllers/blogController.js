const Blog = require("../models/blogModel");
const User = require("../models/userModel");

// --- CREATE POST (With Automatic User Info) ---
exports.createBlog = async (req, res) => {
  try {
    // 1. Logged in user ki details fetch karo
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const data = {
      ...req.body,
      authorId: user._id, // Automatic
      authorName: user.name, // Automatic
      authorEmail: user.email, // Automatic
    };

    if (req.file) {
      data.thumbnail = req.file.path;
    }

    if (data.tags && typeof data.tags === "string") {
      data.tags = data.tags.split(",").map((t) => t.trim());
    }

    const newBlog = await Blog.create(data);
    res
      .status(201)
      .json({ success: true, message: "Post created!", data: newBlog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// --- UPDATE POST (With Ownership Check) ---
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Post not found" });

    // 2. CHECK OWNERSHIP: Kya ye blog isi user ka hai?
    if (blog.authorId.toString() !== req.user.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only edit your own posts.",
      });
    }

    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    if (updateData.tags && typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map((t) => t.trim());
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Post updated!", data: updatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// --- GET ALL (Public View) ---
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 5, search, category, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } }, // Updated field name
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "All Categories") query.category = category;
    if (status && status !== "All Status") query.status = status;

    const blogs = await Blog.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        totalRecords: total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- DELETE BLOG (With Ownership Check) ---
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Post not found" });

    // 3. CHECK OWNERSHIP: Delete karne se pehle verify karo
    if (blog.authorId.toString() !== req.user.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own posts.",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getBlogById as it is rahega
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
