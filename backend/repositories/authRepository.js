const User = require("../models/user");

class AuthRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(userId) {
    return await User.findById(userId);
  }
}

module.exports = new AuthRepository();
