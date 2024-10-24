const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (allowedRoles = []) => (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthenticated." });
    }

    req.userId = decodedToken.userId;
    req.userRole = decodedToken.role;

    if (allowedRoles.length && !allowedRoles.includes(decodedToken.role)) {
      return res.status(403).json({ message: "Forbidden: You don't have access." });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthenticated." });
  }
};

module.exports = isAuth;
