import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, image, countInStock, size } = req.body;
    
    // Check for missing required fields
    const missingFields = [];
    
    if (!name) missingFields.push('name');
    if (!description) missingFields.push('description');
    if (price === undefined || price === null) missingFields.push('price');
    if (!category) missingFields.push('category');
    if (!brand) missingFields.push('brand');
    if (!image) missingFields.push('image');
    if (countInStock === undefined || countInStock === null) missingFields.push('countInStock');
    
    // If there are missing fields, return error
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Validate field types and values
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Price must be a positive number' 
      });
    }
    
    if (typeof countInStock !== 'number' || countInStock < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'countInStock must be a positive number' 
      });
    }
    
    // if (size) {
    //   return res.status(400).json({ 
    //     success: false,
    //     message: 'size must be an array' 
    //   });
    // }
    
    // Validate string fields are not empty
    if (name.trim() === '') {
      return res.status(400).json({ 
        success: false,
        message: 'name cannot be empty' 
      });
    }
    
    if (description.trim() === '') {
      return res.status(400).json({ 
        success: false,
        message: 'description cannot be empty' 
      });
    }
    
    if (category.trim() === '') {
      return res.status(400).json({ 
        success: false,
        message: 'category cannot be empty' 
      });
    }
    
    if (brand.trim() === '') {
      return res.status(400).json({ 
        success: false,
        message: 'brand cannot be empty' 
      });
    }
    
    if (image.trim() === '') {
      return res.status(400).json({ 
        success: false,
        message: 'image cannot be empty' 
      });
    }
    
    // Create product if all validations pass
    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      image,
      countInStock,
      size, // Default to empty array if not provided
      user: req.user._id,
    });

    const createdProduct = await product.save();
    
    res.status(201).json({
      success: true,
      data: createdProduct,
      message: "Product created successfully"
    });
    
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: messages.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Single Product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.image = req.body.image || product.image;
    product.countInStock =
      req.body.countInStock || product.countInStock;
    product.size = req.body.size || product.size;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};