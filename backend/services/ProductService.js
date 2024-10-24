const productRepository = require("../repositories/ProductRepository");
const { validationResult } = require("express-validator");
const { unlink } = require("../utils/unlink");
const fs = require('fs');
const path = require('path');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

class ProductService {
  async getAllProducts(page, limit) {
    return await productRepository.getAllProducts(page, limit);
  }

  async getProductById(id) {
    const product = await productRepository.getProductById(id);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  }

  async createProduct(productData) {
    const { title, content, image } = productData;

    if (!title || !content) {
      throw new Error("Validation failed: Title and content are required.");
    }

    return await productRepository.createProduct({
      title,
      content,
      image: image || "",
    });
  }

  async updateProduct(id, body, file) {
    const product = await productRepository.getProductById(id);
    if (!product) {
      throw new Error("Product not found.");
    }

    const updateData = {
      title: body.title || product.title,
      content: body.content || product.content,
    };

    if (file) {
      if (product.image) {
        const oldImagePath = path.join(__dirname, '..', product.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Failed to delete old image: ${oldImagePath}`, err);
          }
        });
      }

      updateData.image = file.path;
    }

    return await productRepository.updateProduct(id, updateData);
  }

  async deleteProduct(productId) {
    const product = await productRepository.getProductById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const imagePath = product.image; 
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        await fs.promises.unlink(imagePath); 
      } catch (error) {
        console.error("Error deleting image file:", error);
        throw new Error("Error deleting the product's image.");
      }
    }

    try {
      await productRepository.deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Error deleting the product from the database.");
    }
  }
}

module.exports = new ProductService();
