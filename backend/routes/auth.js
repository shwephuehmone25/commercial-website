const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

// POST /register
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail already exists!");
          }
        });
      }),
    body("username")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters long!")
      .custom(async (value) => {
        const userDoc = await User.findOne({ username: value });
        if (userDoc) {
          return Promise.reject("Username already exists!");
        }
      }),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long!"),
  ],
  authController.register
);

// POST /login
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email!"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long!"),
  ],
  authController.login
);

// GET /status
router.get("/status", authController.checkStatus);

module.exports = router;
