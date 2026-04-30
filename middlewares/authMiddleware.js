// const jwt = require("jsonwebtoken");

// const protect = async (req, res, next) => {
//   let token = req.headers.authorization;

//   if (token && token.startsWith("Bearer")) {
//     try {
//       token = token.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded.id;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "No token, authorization denied" });
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔥 FIX: Fetch full user instead of just ID
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user; // ✅ now it's full object

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = { protect };
