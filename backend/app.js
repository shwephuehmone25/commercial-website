const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors"); 
const path = require("path");

const app = express();

/** CORS middleware */
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/** Serve static files for images */
app.use("/images", express.static(path.join(__dirname, "images")));

/** Express body parser for JSON data */
app.use(express.json());

/** Importing routes */
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

/** Use routes */
app.use(authRoutes);
app.use(productRoutes);

/** MongoDB connection */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(7000, () => {
      console.log("Server is running on port 7000 and connected to MongoDB.");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
