const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const { Parser } = require("json2csv");

// --- CREATE POST (With Automatic User Info) ---
exports.createBlog = async (req, res) => {
  try {
    // 1. Fetch details of the logged-in user
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const data = {
      ...req.body,
      authorId: user._id,
      authorName: user.name,
      authorEmail: user.email,
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

    // 2. CHECK OWNERSHIP: Does this blog belong to the current user?
    if (blog.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only edit your own posts.",
      });
    }

    if (req.file) {
      updateData.thumbnail = req.file.path;
    } else {
      delete updateData.thumbnail;
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

    //  SEARCH Logic
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // Title match
        { authorName: { $regex: search, $options: "i" } }, // Author match
        { tags: { $regex: search, $options: "i" } }, // Tags match
      ];
    }

    //  CATEGORY Logic
    if (category && category !== "All Categories") {
      query.category = category;
    }

    //  STATUS Logic
    if (status && status !== "All Status") {
      query.status = status;
    }

    //  DB Query Execute (with Pagination)
    const blogs = await Blog.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    // Total count for frontend pagination
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

    //  CHECK OWNERSHIP
    if (blog.authorId.toString() !== req.user._id.toString()) {
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

// getBlogById
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- EXPORT TO CSV API ---
exports.exportToCSV = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let query = {};

    //  Search Filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    //  Category Filter
    if (category && category !== "All Categories") {
      query.category = category;
    }

    //  Status Filter
    if (status && status !== "All Status") {
      query.status = status;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for the selected filters",
      });
    }

    // Setup CSV Fields
    const fields = [
      { label: "Blog Title", value: "title" },
      { label: "Category", value: "category" },
      { label: "Author", value: "authorName" },
      { label: "Status", value: "status" },
      {
        label: "Created At",
        value: (row) => new Date(row.createdAt).toLocaleDateString(),
      },
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(blogs);

    // Send the response
    res.header("Content-Type", "text/csv");
    res.attachment(`Blog_Export_${Date.now()}.csv`);
    return res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
