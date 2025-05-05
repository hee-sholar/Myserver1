import express from "express";
import Product from "../models/product.js";
import handleErrors from "../utils/errorHandler.js";
import getPaginationData from "../utils/paginate.js";

const router = express.Router();

// Create a single Product
export const createProduct = async (req, res) => {
  const { name, desc, price, stock } = req.body;

  try {
    const product = new Product({ name, desc, price, stock });
    const savedProduct = await product.save();
    return res.status(201).json({
      message: "✅ Product created successfully",
      product: savedProduct
    });
  } catch (error) {
    console.log("❌ Error creating product:", error.message);
    res.status(400).json({
      message: "❌ Failed to create product",
      error: error.message
    });
  }
};

// Create Multiple Products
export const createMultipleProducts = async (req, res) => {
  try {
    const products = [];

    for (let i = 0; i < 10; i++) {
      const product = await Product.create(req.body);
      products.push(product);
    }

    res.status(201).json({
      message: "✅ Multiple products created successfully",
      products,
    });
  } catch (error) {
    console.log("❌ Error creating multiple products:", error.message);
    res.status(400).json({
      message: "❌ Failed to create multiple products",
      error: error.message,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
      const { currentPage, itemsPerPage, skip, totalPages } = getPaginationData(
        req.query.page,
        req.query.limit,
        totalProducts
      );
      const products = await Product.find().skip(skip).limit(itemsPerPage);
      res.json({
        message: "✅ Products retrieved successfully",
        currentPage,
        totalPages,
        totalProducts,
        products,
      });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
};
  

// Get Single Product
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!Product)
      return res.status(404).json({ message: "❌ Product not found" });

    res.json({
      message: "✅ Product retrieved successfully",
      product
    });
  } catch (error) {
    console.log("❌ Error fetching product:", error.message);
    res.status(400).json({
      message: "❌ Failed to fetch product",
      error: error.message
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, desc, price, stock } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, desc, price, stock },
      { new: true, runValidators: true }
    );
    if (!Product)
      return res.status(404).json({ message: "❌ Product not found" });

    res.json({
      message: "✅ Product updated successfully",
      product: updated
    });
  } catch (error) {
    console.log("❌ Error updating product:", error.message);
    res.status(400).json({
      message: "❌ Failed to update product",
      error: error.message
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!Product)
      return res.status(404).json({ message: "❌ Product not found" });

    res.json({
      message: "✅ Product deleted successfully",
      product: deleted
    });
  } catch (error) {
    console.log("❌ Error deleting product:", error.message);
    res.status(400).json({
      message: "❌ Failed to delete product",
      error: error.message
    });
  }
};
