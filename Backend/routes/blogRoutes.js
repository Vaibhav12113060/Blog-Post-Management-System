const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary");
const {
  createBlog,
  updateBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
  exportToCSV,
} = require("../controllers/blogController");

// Export to CSV route
router.get("/export-csv", protect, exportToCSV);

// --- Public Routes ---
router.get("/", getBlogs); // Listing with Search/Pagination
router.get("/:id", getBlogById); // View details page

// --- Protected CRUD Routes ---

// Create Blog - POST /api/v1/blog
router.post("/", protect, upload.single("thumbnail"), createBlog);

// Update Blog - PUT /api/v1/blog/:id
router.put("/:id", protect, upload.single("thumbnail"), updateBlog);

// Delete Blog - DELETE /api/v1/blog/:id
router.delete("/:id", protect, deleteBlog);

module.exports = router;
