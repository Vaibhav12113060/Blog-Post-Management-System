const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    // Automatic Fields (Linked to User Model)
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: { type: String, required: true }, // For quick display without population
    authorEmail: { type: String, required: true },

    category: {
      type: String,
      enum: ["Technology", "Business", "Lifestyle", "Design", "Other"],
      required: true,
    },
    tags: [String],
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    thumbnail: { type: String },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

blogSchema.index({ title: "text", authorName: "text", category: "text" });

module.exports = mongoose.model("Blog", blogSchema);
