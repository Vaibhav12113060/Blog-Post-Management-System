const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Configuration
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

// API Routes

// Auth Routes

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/blog", require("./routes/blogRoutes"));

// Welcome/Root Route
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome To Blog Post Management</h1>");
});

// Port & Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`.bgCyan);
});
