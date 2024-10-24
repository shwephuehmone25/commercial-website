const Product = require("../models/product");

class ProductRepository {
  async getAllProducts(page = 1, limit = 6) {
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    return { products, totalProducts };
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductRepository();
