const productService = require("../services/ProductService");

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const { products, totalProducts } = await productService.getAllProducts(page);
    const totalPages = Math.ceil(totalProducts / 6); 
    return res.status(200).json({ products, totalProducts, totalPages });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve products.", error: error.message });
  }
};

//get product details
exports.getProductDetails = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve product details.", error: error.message });
  }
};

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/images/${req.file.filename}` : null; 

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const newProduct = await productService.createProduct({ title, content, image });
    return res.status(201).json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Failed to create product.", error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;  
    const file = req.file;  

    const updatedProduct = await productService.updateProduct(id, req.body, file);
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ message: "Failed to update product.", error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    await productService.deleteProduct(productId);

    res.status(204).send(); 
  } catch (error) {
    console.error("Error in deletion:", error.message);
    if (error.message === "Product not found.") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};
