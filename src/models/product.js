import { Schema, model} from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: [true, "Product name is required"], trim: true },
    },
    {
        description: { type: String, required: [true, "Product description is required"], trim: true },
    },
    {
        price: { type: Number, required: [true, "Product price is required"], min: [0, "Product price must be a positive number"] },
    },
    {
        category: { type: Schema.Types.ObjectId, ref:"Categories",  },
    },
    {
        stock: { type: Number, required: [true, "Product stock is required"], min: 0},
    },

    {timestamps: true}
);

const Product = model("Product", productSchema);
export default Product;