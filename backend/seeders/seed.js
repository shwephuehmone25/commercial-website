require('dotenv').config(); 
const mongoose = require("mongoose");
const User = require("../models/user"); 

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminExists = await User.findOne({ email: "shwephue@gmail.com" }); 

    if (!adminExists) {
      const adminUser = await User.create({
        username: "AdminUser", 
        email: "shwephue@gmail.com", 
        password: "Shwe123!@#", 
        role: "admin", 
      });

      console.log("Admin user created:", adminUser);
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
