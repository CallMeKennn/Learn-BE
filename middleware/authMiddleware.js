const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token)
    return res.status(401).json({ message: "Access Denied: No Token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // gắn user vào req để dùng ở controller
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
