const { validationResult } = require("express-validator");
const authService = require("../services/authService");

// Register
exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed.",
      errorMessages: errors.array(),
    });
  }

  const { email, password, username, role } = req.body; 

  try {
    const user = await authService.registerUser({ email, password, username, role });
    res.status(201).json({ message: "Registration successful.", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong during registration." });
  }
};

// Login
exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed.",
      errorMessages: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const { token, userId, email: userEmail, role } = await authService.loginUser(email, password);
    res.status(200).json({ token, userId, email: userEmail, role }); 
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err.message });
  }
};

// Check user authentication and role
exports.checkStatus = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated: No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const tokenData = authService.verifyToken(token);
    req.userId = tokenData.userId;
    req.userRole = tokenData.role; 
    res.status(200).json({ userId: req.userId, role: req.userRole });
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
