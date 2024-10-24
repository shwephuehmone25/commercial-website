const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRepository = require("../repositories/authRepository");

class AuthService {
  async registerUser({ email, password, username, role }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await authRepository.createUser({
        email,
        password: hashedPassword,
        username,
        role, 
      });

      return user;
    } catch (error) {
      throw new Error("Error registering user: " + error.message);
    }
  }

  // Login user and generate JWT
  async loginUser(email, password) {
    try {
      const user = await authRepository.findUserByEmail(email);
      if (!user) {
        throw new Error("E-mail does not exist.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }

      const token = jwt.sign(
        { email: user.email, userId: user._id, role: user.role }, 
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      return { token, userId: user._id, email: user.email, role: user.role };
    } catch (error) {
      throw new Error("Login failed: " + error.message);
    }
  }

  // Verify JWT token and return the decoded token with role
  verifyToken(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      return decodedToken; 
    } catch (error) {
      throw new Error("Token verification failed: Unauthenticated.");
    }
  }
}

module.exports = new AuthService();
