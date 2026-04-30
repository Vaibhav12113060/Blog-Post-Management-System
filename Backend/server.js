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

const allowedOrigins = [
  "http://localhost:5173", // Local Vite
  "http://192.168.0.106:5173",
  process.env.FRONTEND_URL,
];

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        // Agar origin whitelist mein hai, toh allow
        callback(null, true);
      } else {
        // Agar nahi hai, toh block
        callback(new Error("Not allowed by CORS"));
      }
    },
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
