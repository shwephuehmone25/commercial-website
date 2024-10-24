const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");

// Custom multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

const router = express.Router();
const productController = require("../controllers/product");
const isAuth = require("../middlewares/is-auth"); 
const checkRole = require("../middlewares/checkRole"); 
const rateLimiter = require("../middlewares/rateLimiter"); 

// GET /products
router.get("/products", rateLimiter, productController.getAllProducts);

// POST /create/product
router.post(
  "/create/product",
  isAuth(["admin"]),
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors (e.g., file size limit)
        return res.status(400).json({ message: "Multer error: " + err.message });
      } else if (err) {
        // Handle other errors (e.g., invalid file type)
        return res.status(400).json({ message: "File upload error: " + err.message });
      }
      next();
    });
  },
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title is too short")
      .isLength({ max: 30 })
      .withMessage("Title is too long"),
    body("content")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Content is too short"),
  ],
  rateLimiter,
  productController.createProduct
);

// GET /products/:id
router.get("/products/:id", rateLimiter, productController.getProductDetails);

// PUT /edit/:id
router.put(
  "/edit/:id",
  isAuth(["admin"]), 
  upload.single("image"), 
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title is too short")
      .isLength({ max: 30 })
      .withMessage("Title is too long"),
    body("content")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Content is too short"),
  ],
  rateLimiter,
  productController.updateProduct
);

// DELETE /delete/product/:id
router.delete(
  "/delete/product/:id",
  isAuth(["admin"]),  
  rateLimiter, 
  productController.deleteProduct
);

module.exports = router;
