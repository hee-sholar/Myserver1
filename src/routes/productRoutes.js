import express from "express";
import { createMultipleProducts, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.post("/createMultiple", createMultipleProducts);
productRouter.get("/getAll", getAllProducts);
productRouter.post("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
